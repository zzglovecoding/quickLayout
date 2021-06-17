/*
 * @Description: 画布的state等
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-16 21:34:17
 */

import { message } from 'antd';
import { eraseEditingNowBaseonUUID, addNodeToProperSite, checkisConflict, deleteANodeOnTree, adjustLevel } from '@/utils/operateTree.js';
import { uuid as uuidGenerator } from '@/utils/common.js';

export default function(_, settings, editing ) {
    const {
        componentTree,
        setComponentTree
    } = settings;

    const {
        setEditingComponent
    } = editing;

    // 放在画布区域之后的回调函数
    const handleDropInDisplayArea = e => {
        e.stopPropagation();
        // 先判断是不是拉伸大小
        let isAdjustSizing = e.dataTransfer.getData('isAdjustSizing');
        if (isAdjustSizing) {return;}
        // 获取该节点的所有虚拟dom的子节点，然后准备添加到新节点中去
        let childrenStr = e.dataTransfer.getData('children');
        let children = childrenStr === '' ? '[]' : childrenStr;
        children = JSON.parse(children);

        // 生成其他的基本数据
        let componentName = e.dataTransfer.getData('componentName');
        let yOffset = e.dataTransfer.getData('yOffset');
        let xOffset = e.dataTransfer.getData('xOffset');
        let isAgain = e.dataTransfer.getData('again');
        let width = parseFloat(e.dataTransfer.getData('width'));
        let height = parseFloat(e.dataTransfer.getData('height'));
        let isEditingNow = e.dataTransfer.getData('isEditingNow');
        // 深拷贝一个组件树的对象，因为马上要删除避免碰撞，所以保留一个用于后面setState回退
        let componentCopy = JSON.parse(JSON.stringify(componentTree));
        // 先删除的原因，是碰撞检测就不会碰到原先的，后面如果检测失败，会用componentCopy回退所以不用担心
        let uuid = e.dataTransfer.getData('uuid');
        deleteANodeOnTree(componentTree, uuid);
        setComponentTree({ ...componentTree });
        // 第一次和第二次拖动，只有位置数据是需要分别讨论的
        let left;
        let top;
        if (isAgain) {
            left = e.clientX - parseFloat(xOffset);
            top = e.clientY - parseFloat(yOffset);
        } else {
            // 从侧边栏拖动的时候，e.clientX - xffset - 320之后，才会是元素左上角，在展示区域的坐标值
            left = e.clientX - 320 - parseFloat(xOffset);
            top = e.clientY - 70 - parseFloat(yOffset);
        }

        let newNodeUUID = uuidGenerator();
        // 更新他的children的parent全部为这个uuid,因为之前的那个父级会被删掉
        children.forEach(item => {
            item.current.parent = newNodeUUID;
        });
        // 下面就是插入到页面当中的逻辑，先生成treeNode，再插入进去
        let treeNode = {
            current: {
                uuid: newNodeUUID,
                componentName,
                left,
                top,
                width,
                height,
                isEditingNow
            },
            children
        };
        // 检查新节点与整个节点树的冲突关系
        let noConflict = checkisConflict(treeNode, componentTree);
        let forChildren = {
            current: componentTree.current,
            children: [...children]
        };
        let noConflictWithChildren = checkisConflict(treeNode, forChildren);
        if (noConflict && noConflictWithChildren) {
            // noConflict的directParent是之前的最近父级，但是父级可能会被删掉，导致他的子元素找不到原先的uuid了
            let targetUUID = noConflict.directParent;
            // 摆放位置没有冲突，可以找到父级然后添加到树当中
            treeNode.current.parent = targetUUID;
            addNodeToProperSite(treeNode, componentTree, targetUUID);
            // // adjustLevel，调整一下层级关系
            adjustLevel(componentTree);
            // 消除其他被选中状态，需要在虚拟dom完成操作之后执行
            eraseEditingNowBaseonUUID(componentTree, newNodeUUID);
            setComponentTree({ ...componentTree });
            setEditingComponent(treeNode);
        } else {
            message.error('不规范的摆放，请重新摆放');
            setComponentTree({ ...componentCopy });
        }
        
    };

    // 生成辅助线数组
    const generateTickArr = (length, lineSegmentsLength) => {
        let arr = [];
        let currentLength = 0;
        while (currentLength + lineSegmentsLength < length) {
            arr.push(((currentLength + lineSegmentsLength) + ''));
            currentLength += lineSegmentsLength;
        }
        arr.push((length + ''));
        return arr;
    };

    return {
        handleDropInDisplayArea,
        generateTickArr
    };
}