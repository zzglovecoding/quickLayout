/*
 * @Description: 生成less文件的流程逻辑
 * @Author: zzglovecoding
 * @Date: 2021-06-19 13:47:43
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 13:56:41
 */
import { generateContainerStyle, generateLessBody } from './generateLessSegment';

export function generateLess(globalSetting) {
    let lessArr = [];
    // container的样式
    lessArr.push(...generateContainerStyle(globalSetting));
    // 子孙元素的样式
    lessArr.push(...generateLessBody(globalSetting));
    // 最后的反括号
    lessArr.push('}');
    return lessArr;
}