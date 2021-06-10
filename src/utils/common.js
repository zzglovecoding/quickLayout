// 根据对象生成DOM
function generateElement(item) {
    let element = document.createElement(item.current.componentName);
    element.style.position = 'absolute';
    element.style.left = item.current.left + 'px';
    element.style.top = item.current.top + 'px';
    element.style.width = item.current.width + 'px';
    element.style.height = item.current.height + 'px';
    element.style.border = '1px solid rgba(128,128,128,.3)';
    return element;
}

// 把这个节点下面的也都加上，采用递归
function Ite(node, current) {
    if (node.children.length > 0) {
        node.children.map(item => {
            let element = generateElement(item);
            Ite(item, element);
            return element;
        }).forEach(one => {
            current.appendChild(one);
        });
    }
}

// 根据componentTree，在layoutContainer中把效果图画出来
export function paintDisplayLayout(componentTree, canvas) {
    let frag = new DocumentFragment();
    componentTree.children.map(item => {
        let element = generateElement(item);
        Ite(item, element);
        return element;
    }).forEach(one => {
        frag.appendChild(one);
    });

    canvas.appendChild(frag);
}

// TODO: 吸附于辅助线的函数
export function fixToSupLine() {

}

export function uuid() {
    return Math.floor(Math.random() * +new Date());
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

// 把它添加到树当中
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