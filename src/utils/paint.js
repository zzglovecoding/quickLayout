/*
 * @Description: 根据componentTree生成jsx树
 * @Author: zzglovecoding
 * @Date: 2021-06-14 17:29:38
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 00:01:41
 */
import React from 'react';
import { message } from 'antd';
import { deleteANodeOnTree, eraseEditingNowBaseonUUID, checkisConflict, getTargetBaseOnuuid, adjustLevel, addNodeToProperSite, upDateRelatePosition } from '@/utils/operateTree.js';
import Resizer from '@/components/resizer/Resizer.jsx';
import { uuid as uuidGenerator } from '@/utils/common.js';

// 根据对象生成DOM
const handleDragStart = (e, item) => {
    let currentNode = item.current;
    // 这两个偏移值，是鼠标和元素左上角的x和y的距离
    e.stopPropagation();
    let xOffset = e.clientX - currentNode.left;
    let yOffset = e.clientY - currentNode.top;
    e.target.style.opacity = '0.4';
    e.dataTransfer.setData('className', currentNode.className);
    e.dataTransfer.setData('isSingle', currentNode.isSingle);
    e.dataTransfer.setData('componentName', currentNode.componentName);
    e.dataTransfer.setData('width', currentNode.width);
    e.dataTransfer.setData('height', currentNode.height);
    e.dataTransfer.setData('left', currentNode.left);
    e.dataTransfer.setData('top', currentNode.top);
    e.dataTransfer.setData('xOffset', xOffset);
    e.dataTransfer.setData('yOffset', yOffset);
    e.dataTransfer.setData('again', true);
    e.dataTransfer.setData('uuid', currentNode.uuid);
    e.dataTransfer.setData('isEditingNow', true);
    e.dataTransfer.setData('children', JSON.stringify(item.children));
};

const handleDragEnd = e => {
    e.stopPropagation();
    e.target.style.opacity = '1';
    e.dataTransfer.clearData();
};

export function generateElement(item, setEditingComponent, componentTree, setComponentTree) {
    let left, top;
    if (item.current.parent === 1) {
        left = item.current.left + 'px';
        top = item.current.top + 'px';
    } else {
        let parent = getTargetBaseOnuuid(componentTree, item.current.parent).current;
        left = item.current.left - parent.left + 'px';
        top = item.current.top - parent.top + 'px';
    }
    let style = {
        position: 'absolute',
        width: item.current.width + 'px',
        height: item.current.height + 'px',
        cursor: 'pointer',
        border: item.current.isEditingNow ? '2px dashed rgba(128,128,128,.5)' : '1px solid rgba(128,128,128,.3)',
        boxShadow: item.current.isEditingNow ? '2px 2px 4px rgb(136,136,136)' : '',
        left,
        top
    };
    const handleResize = (resizeStyle) => {
        let componentTreeCopy = JSON.parse(JSON.stringify(componentTree));
        item.current.left = resizeStyle.left;
        item.current.top = resizeStyle.top;
        item.current.width = resizeStyle.width;
        item.current.height = resizeStyle.height;
        let newNodeUUID = uuidGenerator();
        let children = [...item.children];
        children.forEach(item => {
            item.current.parent = newNodeUUID;
        });
        deleteANodeOnTree(componentTree, item.current.uuid);
        let treeNode = {
            current: {
                ...item.current,
                uuid: newNodeUUID
            },
            children: children
        };
        let noConflict = checkisConflict(treeNode, componentTree);
        let forChildren = {
            current: componentTree.current,
            children: [...children]
        };
        let noConflictWithChildren = checkisConflict(treeNode, forChildren);
        if (noConflict && noConflictWithChildren) {
            let targetUUID = noConflict.directParent;
            treeNode.current.parent = targetUUID;
            addNodeToProperSite(treeNode, componentTree, targetUUID);
            let noSingleContains = adjustLevel(componentTree);
            if (noSingleContains) {
                upDateRelatePosition(componentTree);
                setComponentTree({ ...componentTree });
                setEditingComponent(item);
            } else {
                message.error('单标签不能嵌套其他标签');
                setComponentTree({ ...componentTreeCopy });
            }
        } else {
            message.error('拉伸调大小出现冲突，请重新拉伸');
            setComponentTree({ ...componentTreeCopy });
            return;
        }
        
    };
    let component = (<div
        onDragStart= {e => {
            item.current.isEditingNow = true;
            handleDragStart(e, item);
        }}
        onDragEnd = {e => handleDragEnd(e)}
        onClick = {() => {
            eraseEditingNowBaseonUUID(componentTree, item.current.uuid);
            item.current.isEditingNow = true;
            setComponentTree({ ...componentTree });
            setEditingComponent(item);
        }}
        draggable={true}
        style={style}
        key={Math.random()}
    >
        {
            item.children?.map(child => {
                return generateElement(child, setEditingComponent, componentTree, setComponentTree);
            })
        }
        {
            item.current.isEditingNow ? <Resizer onResize={handleResize} style={{ width: item.current.width, height: item.current.height, left: item.current.left, top: item.current.top }}/> : <></>
        }
        {
            <span style={{ fontWeight: '700', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(0, 106, 180, 0.8)' }}>{item.current.componentName}</span>
        }
    </div>);

    return component;
}