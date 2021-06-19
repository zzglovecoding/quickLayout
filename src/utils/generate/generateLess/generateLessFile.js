/*
 * @Description: 生成less文件的流程逻辑
 * @Author: zzglovecoding
 * @Date: 2021-06-19 13:47:43
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-19 14:50:23
 */
import { generateContainerStyle, generateLessBody } from './generateLessSegment';

export function generateLess(componentTree) {
    let lessArr = [];
    // container的样式
    lessArr.push(...generateContainerStyle(componentTree));
    // 子孙元素的样式
    lessArr.push(...generateLessBody(componentTree));
    // 最后的反括号
    lessArr.push('}');
    return lessArr;
}