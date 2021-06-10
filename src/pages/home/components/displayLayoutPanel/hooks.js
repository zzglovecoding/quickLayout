import { useEffect } from 'react';
import { message } from 'antd';
import { paintDisplayLayout, checkisConflict, addNodeToProperSite, deleteANodeOnTree } from '@/utils/common.js';
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
        let isAgain = e.dataTransfer.getData('again');
        let componentCopy = JSON.parse(JSON.stringify(componentTree));
        let left;
        let top;
        // 第二次拖动，就需要判断一下
        if (isAgain) {
            left = e.clientX - xOffset;
            top = e.clientY - yOffset;
            let uuid = e.dataTransfer.getData('uuid');
            deleteANodeOnTree(componentTree, uuid);
            setComponentTree({ ...componentTree });
        } else {
            left = e.clientX - 320 - xOffset;
            top = e.clientY - 70 - yOffset;
        }

        // 下面就是插入到页面当中的逻辑，先生成treeNode，再插入进去
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
            let targetUUID = noConflict.directParent;
            // 摆放位置没有冲突，可以找到父级然后添加到树当中
            addNodeToProperSite(treeNode, componentTree, targetUUID);
            setComponentTree({ ...componentTree });
        } else {
            message.error('不规范的摆放，请重新摆放');
            setComponentTree({ ...componentCopy });
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