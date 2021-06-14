/*
 * @Description: 操作虚拟DOM树的一些操作
 * @Author: zzglovecoding
 * @Date: 2021-06-14 19:47:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-15 01:14:01
 */

// 清除componentTree当中，除了当前uuid的所有的isEditingNow这个属性，是为了消除激活框的状态
export function eraseEditingNowBaseonUUID(componentTree, uuid) {
    function Ite(node, uuid) {
        if (node.current.uuid !== uuid) {
            node.current.isEditingNow = false;
        }
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item, uuid);
            });
        }
    }
    Ite(componentTree, uuid);
}

// 在componentTree当中获取uuid为指定值的那个对象
export function getTargetBaseOnuuid(componentTree, uuid) {
    let target;
    function Ite(node, uuid) {
        if (node.current.uuid === uuid) {
            target = node;
            return;
        }
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item, uuid);
            });
        }
    }
    Ite(componentTree, uuid);
    return target;
}

// 在componentTree当中把insertNode加入到父id为targetUUID的节点上
export function addNodeToProperSite(insertNode, componentTree, targetUUID) {
    function Ite(node) {
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item);
            });
        }
        if (node.current.uuid === targetUUID) {
            node.children.push(insertNode);
            return;
        }
    }
    Ite(componentTree);
}

// 递归树，看有没有冲突，有冲突就需要重新摆放
export function checkisConflict(currentBox, componentTree) {
    let uuidArr = [];
    let result = [];
    let flag = true;
    let currentBoxArr = getDistance(currentBox.current);
    // 遍历每一个节点，如果有交叉，说明存在
    function Ite(node) {
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item);
            });
        }
        let containerBoxArr = getDistance(node.current);
        // 只要有一个冲突，都说明有冲突
        flag = judgeTwoBox(currentBoxArr, containerBoxArr, node);
        // false,true,number都加到数组了
        result.push(flag);
    }
    Ite(componentTree);
    if (result.includes(false)) {
        return false;
    }
    // 说明没有问题，只需要找到最近的那个就可以了
    result.forEach(item => {
        if (typeof (item) === 'number') {
            uuidArr.push(item);
        }
    });
    let parentId = decideUUID(currentBoxArr, uuidArr, componentTree);
    return {
        directParent: parentId
    };
    
}

// 从componentTree当中删除掉指定uuid的节点
export function deleteANodeOnTree(componentTree, uuid) {
    function Ite(node, uuid) {
        let arr = node.children.map(item => {
            return item.current.uuid;
        });
        if (arr.includes(uuid)) {
            let index = arr.indexOf(uuid);
            node.children.splice(index, 1);
            return;
        }
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item, uuid);
            });
        }
    }
    Ite(componentTree, parseInt(uuid, 10));
}

// 获取盒子在x轴的坐标范围和y轴的坐标范围，用数组描述
export function getDistance(box) {
    let horizon_span = [];
    let vertical_span = [];
    let hstart = box.left;
    let hend = box.left + box.width;
    let vstart = box.top;
    let vend = box.top + box.height;
    horizon_span.push(hstart, hend);
    vertical_span.push(vstart, vend);
    return [horizon_span, vertical_span];
}

// 判断两个box有没有交叉
export function judgeTwoBox(box1, box2, box2Obj) {
    // closest记录的是box1的直接父级的uuid
    let closest;
    // 在下面的情况当中是没有交叉的，其他的都有交叉
    let firstxSpan = box1[0];
    let firstySpan = box1[1];
    let secondxSpan = box2[0];
    let secondySpan = box2[1];
    // 如果是并列的情况，就是下面四种中的一种
    if (secondySpan[0] >= firstySpan[1]) {
        return true;
    } else if (secondxSpan[0] >= firstxSpan[1]) {
        return true;
    } else if (secondySpan[1] <= firstySpan[0]) {
        return true;
    } else if (secondxSpan[1] <= firstxSpan[0]) {
        return true;
    }
    // 如果是包含关系,有可能是第一个包含第二个，也可能是第二个包含第一个
    if (firstxSpan[0] >= secondxSpan[0] && firstxSpan[1] <= secondxSpan[1] && firstySpan[0] >= secondySpan[0] && firstySpan[1] <= secondySpan[1]) {
        // 这里就是second包含first的情况
        closest = box2Obj.current.uuid;
        // 还需要判断一下谁更近
        return closest;
    }
    if (secondxSpan[0] >= firstxSpan[0] && secondxSpan[1] <= firstxSpan[1] && secondySpan[0] >= firstySpan[0] && secondySpan[1] <= firstySpan[1]) {
        return true;
    }
    return false;
}

// 获取parentId的方法
function decideUUID(currentBoxArr, uuidArr, componentTree) {
    let arr = [];
    function Ite(node) {
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item);
            });
        }
        if (uuidArr.includes(node.current.uuid)) {
            arr.push({
                range: getDistance(node.current),
                id: node.current.uuid
            });
        }
    }
    Ite(componentTree);
    // 默认最近的是最外层的container
    let currentMin = {
        id: 1,
        totalDistance: 1997
    };
    // 找到最小的id
    arr.forEach(item => {
        let containerXRange = item.range[0];
        let containerYRange = item.range[1];
        let currentXRange = currentBoxArr[0];
        let currentYRange = currentBoxArr[1];
        let total = (currentXRange[0] - containerXRange[0]) + (containerXRange[1] - currentXRange[1]) + (containerYRange[1] - currentYRange[1]) + (currentYRange[0] - containerYRange[0]);
        if (total < currentMin.totalDistance) {
            currentMin.id = item.id;
            currentMin.totalDistance = total;
        }
    });
    return currentMin.id;
}

export function adjustLevel(componentTree) {
    let rest = componentTree.children;
    function Ite(node) {
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item);
            });
        }
        // 找到最近的然后调整
    }
    rest.forEach(item1 => {
        Ite(item1);
    });
}