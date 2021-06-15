/*
 * @Description: 根据componentTree生成真实的DOM树，然后插入到画布中
 * @Author: zzglovecoding
 * @Date: 2021-06-14 17:29:38
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-15 00:40:28
 */
import React from 'react';
import { eraseEditingNowBaseonUUID, getTargetBaseOnuuid } from '@/utils/operateTree.js';
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
        border: item.current.isEditingNow ? '1px dashed red' : '1px solid rgba(128,128,128,.3)',
        left,
        top
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
    </Name>);

    return component;
}