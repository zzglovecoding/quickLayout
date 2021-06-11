import { useEffect } from 'react';
import { message } from 'antd';
import { paintDisplayLayout, checkisConflict, addNodeToProperSite, deleteANodeOnTree, eraseEditingNowBaseonUUID } from '@/utils/common.js';
import { uuid } from '@/utils/common.js';
import { ITEM_DEFAULT_WIDTH, ITEM_DEFAULT_HEIGHT } from '@/constants/common.js';

export default function(sizeData, settings, editing ) {
    const {
        componentTree,
        setComponentTree
    } = settings;

    const {
        setEditingComponent
    } = editing;

    const handleDropInDisplayArea = e => {
        e.stopPropagation();
        let componentName = e.dataTransfer.getData('componentName');
        let yOffset = e.dataTransfer.getData('yOffset');
        let xOffset = e.dataTransfer.getData('xOffset');
        let isAgain = e.dataTransfer.getData('again');
        let isEditingNow = e.dataTransfer.getData('isEditingNow');
        let componentCopy = JSON.parse(JSON.stringify(componentTree));
        let left;
        let top;
        let width;
        let height;
        // 第二次拖动，就需要判断一下
        if (isAgain) {
            left = e.clientX - xOffset;
            top = e.clientY - yOffset;
            width = parseFloat(e.dataTransfer.getData('width'));
            height = parseFloat(e.dataTransfer.getData('height'));
            let uuid = e.dataTransfer.getData('uuid');
            deleteANodeOnTree(componentTree, uuid);
            setComponentTree({ ...componentTree });
        } else {
            left = e.clientX - 320 - xOffset;
            top = e.clientY - 70 - yOffset;
        }

        // 下面就是插入到页面当中的逻辑，先生成treeNode，再插入进去
        let treeNode = {
            current: {
                uuid: uuid(),
                componentName,
                left,
                top,
                width: width ? width : ITEM_DEFAULT_WIDTH,
                height: height ? height : ITEM_DEFAULT_HEIGHT,
                isEditingNow
            },
            children: []
        };
        // 检查是否有冲突，有的话就提示有问题
        let noConflict = checkisConflict(treeNode, componentTree);
        if (noConflict) {
            eraseEditingNowBaseonUUID(componentTree, e.dataTransfer.getData('uuid'));
            let targetUUID = noConflict.directParent;
            // 摆放位置没有冲突，可以找到父级然后添加到树当中
            addNodeToProperSite(treeNode, componentTree, targetUUID);
            setComponentTree({ ...componentTree });
            setEditingComponent(treeNode.current);
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
        paintDisplayLayout(componentTree, canvas, setEditingComponent, setComponentTree);
    }, [componentTree]);

    return {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    };
}