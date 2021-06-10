import { useEffect } from 'react';
import { message } from 'antd';
import { paintDisplayLayout, checkisConflict, addNodeToProperSite } from '@/utils/common.js';
import { uuid } from '@/utils/common.js';
import { ITEM_DEFAULT_WIDTH, ITEM_DEFAULT_HEIGHT } from '@/constants/common.js';

export default function(sizeData, settings) {
    const {
        componentTree,
        setComponentTree
    } = settings;

    const handleDropInDisplayArea = e => {
        e.stopPropagation();
        let componentName = e.dataTransfer.getData('componentName');
        let yOffset = e.dataTransfer.getData('yOffset');
        let xOffset = e.dataTransfer.getData('xOffset');
        let left = e.clientX - 320 - xOffset;
        let top = e.clientY - 70 - yOffset;
        let current = {
            uuid: uuid(),
            componentName,
            left,
            top,
            width: ITEM_DEFAULT_WIDTH,
            height: ITEM_DEFAULT_HEIGHT
        };
        let treeNode = {};
        treeNode.current = current;
        treeNode.children = [];
        // 检查是否有冲突，有的话就提示有问题
        let noConflict = checkisConflict(treeNode, componentTree);
        if (noConflict) {
            // 摆放位置没有冲突，可以找到父级然后添加到树当中
            addNodeToProperSite(treeNode, componentTree);
            setComponentTree({ ...componentTree });
        } else {
            message.error('不规范的摆放，请重新摆放');
            return;
        }
        
    };

    const gridProperties = {
        background: '-webkit-linear-gradient(top,transparent 19px,#e1e4e8 20px),-webkit-linear-gradient(left, transparent 19px, #e1e4e8 20px)',
        backgroundSize: '20px 20px'
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    useEffect(() => {
        if (componentTree.children.length === 0) {
            return;
        }
        let canvas = document.getElementById('layoutContainer');
        // 先清空画布
        canvas.innerHTML = '';
        // 然后根据树画出来
        paintDisplayLayout(componentTree, canvas);
    }, [componentTree]);

    return {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    };
}