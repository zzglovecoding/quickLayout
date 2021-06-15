import React from 'react';
import PropTypes from 'prop-types';
// resizer的样式放在了main.less当中

let resizeType = null;
let resizeStyle = null;
let startX = 0;
let startY = 0;

export default function Resizer(props) {
    let { 
        style,
        onResize 
    } = props;
    let { width, height } = style;
    let events = {
        onDrag: (e) => handleDrag(e, style),
        onDragEnd: (e) => handleDragEnd(e, onResize)
    };

    return (
        <>
            <i onDragStart={(e) => handleDragStart(e, 'top-left')} {...events} draggable="true" className="control top-left-control" style={{ top: offset(0), left: offset(0) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'top')} {...events} draggable="true" className="control top-control" style={{ top: offset(0), left: offset(width / 2) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'top-right')} {...events} draggable="true" className="control top-right-control" style={{ top: offset(0), left: offset(width) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'right')} {...events} draggable="true" className="control right-control" style={{ top: offset(height / 2), left: offset(width) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'bottom-right')} {...events} draggable="true" className="control bottom-right-control" style={{ top: offset(height), left: offset(width) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'bottom')} {...events} draggable="true" className="control bottom-control" style={{ top: offset(height), left: offset(width / 2) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'bottom-left')} {...events} draggable="true" className="control bottom-left-control" style={{ top: offset(height), left: offset(0) }}><span className="control-point"></span></i>
            <i onDragStart={(e) => handleDragStart(e, 'left')} {...events} draggable="true" className="control left-control" style={{ top: offset(height / 2), left: offset(0) }}><span className="control-point"></span></i>
        </>
    );
}

Resizer.propTypes = {
    style: PropTypes.object,
    onResize: PropTypes.func
};

function offset(value = 0) {
    return value - 3;
}

/**     
     * 用于组件拉伸
     */
function handleDragStart(e, type) {
    e.stopPropagation();
    e.dataTransfer.setData('isAdjustSizing', true);
    resizeType = type;     // 从哪个方向拖拽
    resizeStyle = {};      // 拖拽后的样式
    startX = e.clientX;
    startY = e.clientY;
}

function handleDrag(e, style) {
    e.stopPropagation();
    let { clientX, clientY } = e;
    // 鼠标移到窗口外
    if (clientX <= 0 || clientY <= 0) {
        return;
    }
    let { top, left, width, height } = style;
    let w, h;
    let t = top, l = left;
    let parentStyle = e.target.parentElement.style;
    let offsetX = clientX - startX;        // x轴正负偏移了多少
    let offsetY = clientY - startY;        // y轴正负偏移了多少
        
    switch (resizeType) {
        // top, left (+), width, height (-)
        case 'top-left': 
            parentStyle.transformOrigin = '100% 100%';
            l = left + offsetX;
            t = top + offsetY;
            w = width - offsetX;
            h = height - offsetY;
            break;
            // top(+), height (-)
        case 'top': 
            parentStyle.transformOrigin = '50% 100%';
            l = left;
            t = top + offsetY;
            w = width;
            h = height - offsetY;
            break;
            // top(+), width, height (-)
        case 'top-right': 
            parentStyle.transformOrigin = '0 100%';
            l = left;
            t = top + offsetY;
            w = width + offsetX;
            h = height - offsetY;
            break;
            // width
        case 'right': 
            parentStyle.transformOrigin = '0 50%';
            l = left;
            t = top;
            w = width + offsetX;
            h = height;
            break;
            // width, height
        case 'bottom-right': 
            parentStyle.transformOrigin = '0 0';
            l = left;
            t = top;
            w = width + offsetX;
            h = height + offsetY;
            break;
            // height
        case 'bottom': 
            parentStyle.transformOrigin = '50% 0';
            l = left;
            t = top;
            w = width;
            h = height + offsetY;
            break;
            // left(+), width(-), height
        case 'bottom-left': 
            parentStyle.transformOrigin = '100% 0';
            l = left + offsetX;
            t = top;
            w = width - offsetX;
            h = height + offsetY;
            break;
            // left(+), width(-)
        case 'left': 
            parentStyle.transformOrigin = '100% 50%';
            l = left + offsetX;
            t = top;
            w = width - offsetX;
            h = height;
            break;
    }        
    let x = w / width;
    let y = h / height;
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }        
    resizeStyle = {
        width: w,
        height: h,
        top: t,
        left: l
    };
    // 拉伸中只用缩放展示效果
    parentStyle.transform = `scale(${x},${y})`;
}

function handleDragEnd(e, callback) {
    e.stopPropagation();
    e.target.parentElement.style.transformOrigin = '';
    e.target.parentElement.style.transform = '';
    // 拉伸结束后才触发重新渲染
    callback && callback(resizeStyle);
    // 重置属性
    resizeType = null;
    resizeStyle = null;
    startX = 0;
    startY = 0;
}