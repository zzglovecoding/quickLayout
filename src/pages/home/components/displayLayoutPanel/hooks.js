/*
 * @Description: 画布的state等
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-14 20:00:18
 */

import { useEffect } from 'react';
import { message } from 'antd';
import { eraseEditingNowBaseonUUID, addNodeToProperSite, checkisConflict, deleteANodeOnTree } from '@/utils/operateTree.js';
import { paintDisplayLayout } from '@/utils/paint.js';
import { uuid } from '@/utils/common.js';
import { ITEM_DEFAULT_WIDTH, ITEM_DEFAULT_HEIGHT } from '@/constants/common.js';

export default function(_, settings, editing ) {
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
            left = e.clientX - parseFloat(xOffset);
            top = e.clientY - parseFloat(yOffset);
            width = parseFloat(e.dataTransfer.getData('width'));
            height = parseFloat(e.dataTransfer.getData('height'));
            let uuid = e.dataTransfer.getData('uuid');
            deleteANodeOnTree(componentTree, uuid);
            setComponentTree({ ...componentTree });
        } else {
            left = e.clientX - 320 - parseFloat(xOffset);
            top = e.clientY - 70 - parseFloat(yOffset);
            width = ITEM_DEFAULT_WIDTH;
            height = ITEM_DEFAULT_HEIGHT;
        }

        // 下面就是插入到页面当中的逻辑，先生成treeNode，再插入进去
        let treeNode = {
            current: {
                uuid: uuid(),
                componentName,
                left,
                top,
                width,
                height,
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
            treeNode.current.parent = targetUUID;
            addNodeToProperSite(treeNode, componentTree, targetUUID);
            setComponentTree({ ...componentTree });
            setEditingComponent(treeNode.current);
        } else {
            message.error('不规范的摆放，请重新摆放');
            setComponentTree({ ...componentCopy });
        }
        
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
        handleDropInDisplayArea
    };
}