/*
 * @Description: 根据componentTree生成jsx树
 * @Author: zzglovecoding
 * @Date: 2021-06-14 17:29:38
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-15 22:31:11
 */
import React from 'react';
import { eraseEditingNowBaseonUUID, addNodeToProperSite, checkisConflict, getTargetBaseOnuuid } from '@/utils/operateTree.js';
import Resizer from '@/components/resizer/Resizer.jsx';

// 根据对象生成DOM
const handleDragStart = (e, item) => {
    let currentNode = item.current;
    // 这两个偏移值，是鼠标和元素左上角的x和y的距离
    e.stopPropagation();
    let xOffset = e.clientX - currentNode.left;
    let yOffset = e.clientY - currentNode.top;
    e.target.style.opacity = '0.4';
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
    let Name = item.current.componentName;
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
        border: item.current.isEditingNow ? '1px dashed rgba(128,128,128,.5)' : '1px solid rgba(128,128,128,.3)',
        boxShadow: item.current.isEditingNow ? '2px 2px 4px rgb(136,136,136)' : '',
        left,
        top
    };
    const handleResize = (resizeStyle) => {
        let componentCopy = JSON.parse(JSON.stringify(item));
        item.current.left = resizeStyle.left;
        item.current.top = resizeStyle.top;
        item.current.width = resizeStyle.width;
        item.current.height = resizeStyle.height;
        let noConflict = checkisConflict(item, componentTree);
        setComponentTree({ ...componentTree });
        setEditingComponent(item);
    };
    let component = (<Name
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
    </Name>);

    return component;
}