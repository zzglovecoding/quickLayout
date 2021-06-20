/*
 * @Description: 生成Less文件中的片段
 * @Author: zzglovecoding
 * @Date: 2021-06-19 13:47:53
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 14:01:06
 */
import { addLessTabPrefix, convertToStr } from '../generateCommonTools.js';
import { isString } from '@/utils/common.js';

function getLessData(node, widthRatio, heightRatio) {
    let current = `.${node.current.className ? node.current.className : node.current.realComponentName + node.current.uuid} {~}`;
    let children;
    if (node.children.length > 0) {
        children = node.children.map(item => {
            return getLessData(item, widthRatio, heightRatio);
        });
    }
    let startAndEnd = current.split('~');
    let open = startAndEnd[0];
    let close = startAndEnd[1];
    let selfStyleArr = [];
    selfStyleArr.push('position:absolute;');
    selfStyleArr.push(`width:${parseFloat((node.current.width * widthRatio).toFixed(2))}px;`);
    selfStyleArr.push(`height:${parseFloat((node.current.height * heightRatio).toFixed(2))}px;`);
    selfStyleArr.push(`left:${parseFloat((node.current.left * widthRatio).toFixed(2))}px;`);
    selfStyleArr.push(`top:${parseFloat((node.current.top * heightRatio).toFixed(2))}px;`);
    if (!children) {
        let final = [open, ...selfStyleArr, close];
        return final;
    }
    let final = [open, ...selfStyleArr, ...children, close];
    return final;   
}

// 生成除了container的样式数组
export function generateLessBody(globalSetting) {
    const {
        componentTree,
        realCanvasWidth,
        realCanvasHeight
    } = globalSetting;

    let widthRatio = realCanvasWidth / 1198;
    let heightRatio = realCanvasHeight / 798;

    let lessBodyArr = [];
    let arr = getLessData(componentTree, widthRatio, heightRatio);
    // selfStyleCount就是属于自己的属性个数
    let selfStyleCount = arr.filter(item => isString(item)).length - 2;
    arr = arr.slice(selfStyleCount + 1, -1);
    arr.forEach(item => {
        addLessTabPrefix(item, 1);
    });
    arr.forEach(node => {
        convertToStr(node, lessBodyArr);
    });
    return lessBodyArr;
}

export function generateContainerStyle(globalSetting) {
    const {
        realCanvasWidth,
        realCanvasHeight
    } = globalSetting;

    let containerStyleArr = [];
    containerStyleArr.push('.container {');
    containerStyleArr.push(`\twidth:${realCanvasWidth}px;`);
    containerStyleArr.push(`\theight:${realCanvasHeight}px;`);
    containerStyleArr.push('\tposition:relative;');
    return containerStyleArr;
}