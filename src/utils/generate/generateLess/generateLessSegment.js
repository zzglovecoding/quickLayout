/*
 * @Description: 生成Less文件中的片段
 * @Author: zzglovecoding
 * @Date: 2021-06-19 13:47:53
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-19 23:44:50
 */
import { addLessTabPrefix, convertToStr } from '../generateCommonTools.js';
import { isString } from '@/utils/common.js';

function getLessData(node) {
    let current = `.${node.current.className ? node.current.className : node.current.realComponentName + node.current.uuid} {~}`;
    let children;
    if (node.children.length > 0) {
        children = node.children.map(item => {
            return getLessData(item);
        });
    }
    let startAndEnd = current.split('~');
    let open = startAndEnd[0];
    let close = startAndEnd[1];
    let selfStyleArr = [];
    selfStyleArr.push('position:absolute;');
    selfStyleArr.push(`width:${node.current.width}px;`);
    selfStyleArr.push(`height:${node.current.height}px;`);
    selfStyleArr.push(`left:${node.current.relativeLeft}px;`);
    selfStyleArr.push(`top:${node.current.relativeTop}px;`);
    if (!children) {
        let final = [open, ...selfStyleArr, close];
        return final;
    }
    let final = [open, ...selfStyleArr, ...children, close];
    return final;   
}

// 生成除了container的样式数组
export function generateLessBody(componentTree) {
    let lessBodyArr = [];
    let arr = getLessData(componentTree);
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

export function generateContainerStyle(componentTree) {
    let container = componentTree.current;
    let containerStyleArr = [];
    containerStyleArr.push('.container {');
    containerStyleArr.push(`\twidth:${container.width}px;`);
    containerStyleArr.push(`\theight:${container.height}px;`);
    containerStyleArr.push('\tposition:relative;');
    return containerStyleArr;
}