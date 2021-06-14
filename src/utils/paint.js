/*
 * @Description: 根据componentTree生成真实的DOM树，然后插入到画布中
 * @Author: zzglovecoding
 * @Date: 2021-06-14 17:29:38
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-14 19:50:33
 */
import { eraseEditingNowBaseonUUID, getTargetBaseOnuuid } from '@/utils/operateTree.js';

// 根据对象生成DOM
const handleDragStart = (e, currentNode) => {
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
    e.dataTransfer.setData('isEditingNow', currentNode.isEditingNow);
};

const handleDragEnd = e => {
    e.stopPropagation();
    e.target.style.opacity = '1';
    e.dataTransfer.clearData();
};

function generateElement(item, setEditingComponent, componentTree, setComponentTree) {
    let element = document.createElement(item.current.componentName);
    if (item.current.parent === 1) {
        element.style.left = item.current.left + 'px';
        element.style.top = item.current.top + 'px';
    } else {
        let parent = getTargetBaseOnuuid(componentTree, item.current.parent).current;
        let left = parent.left;
        let top = parent.top;
        element.style.left = item.current.left - left + 'px';
        element.style.top = item.current.top - top + 'px';
    }
    element.style.position = 'absolute';
    element.style.width = item.current.width + 'px';
    element.style.height = item.current.height + 'px';
    element.style.cursor = 'pointer';
    element.style.border = item.current.isEditingNow ? '1px dashed red' : '1px solid rgba(128,128,128,.3)';
    // 下面是拖动部分的逻辑
    element.draggable = true;
    element.ondragstart = e => {
        item.current.isEditingNow = true;
        handleDragStart(e, item.current);
    };
    element.ondragend = e => handleDragEnd(e);
    // 下面是点击事件
    element.onclick = () => {
        element.style.border = '1px dashed red';
        eraseEditingNowBaseonUUID(componentTree, item.current.uuid);
        item.current.isEditingNow = true;
        setComponentTree({ ...componentTree });
        setEditingComponent(item.current);
    };
    return element;
}

// 把这个节点下面的也都加上，采用递归
function Ite(node, current, setEditingComponent, componentTree, setComponentTree) {
    if (node.children.length > 0) {
        node.children.map(item => {
            let element = generateElement(item, setEditingComponent, componentTree, setComponentTree);
            Ite(item, element, setEditingComponent, componentTree, setComponentTree);
            return element;
        }).forEach(one => {
            current.appendChild(one);
        });
    }
}

// 根据componentTree，在layoutContainer中把效果图画出来
export function paintDisplayLayout(componentTree, canvas, setEditingComponent, setComponentTree) {
    let frag = new DocumentFragment();
    componentTree.children.map(item => {
        let element = generateElement(item, setEditingComponent, componentTree, setComponentTree);
        Ite(item, element, setEditingComponent, componentTree, setComponentTree);
        return element;
    }).forEach(one => {
        frag.appendChild(one);
    });

    canvas.appendChild(frag);
}