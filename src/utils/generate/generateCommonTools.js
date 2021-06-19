/*
 * @Description:生成文件的一些公用方法，比如添加制表符和转化为数组方法等
 * @Author: zzglovecoding
 * @Date: 2021-06-19 14:28:43
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-19 15:53:40
 */
import { isString } from '@/utils/common.js';

// 生成合适个数的制表符缩进
export function addTabPrefix(arr, currentNums) {
    arr.forEach((str, index) => {
        if (isString(str)) {
            str = ('\t'.repeat(currentNums)) + str;
            arr[index] = str;
        } else {
            addTabPrefix(str, currentNums + 1);
        }
    });
}

// 生成合适个数的制表符缩进
export function addLessTabPrefix(arr, currentNums) {
    let lastIndex = arr.length - 1;
    arr.forEach((str, index) => {
        if (isString(str) && (index === 0 || index === lastIndex)) {
            str = ('\t'.repeat(currentNums)) + str;
            arr[index] = str;
        } else if (isString(str) && index > 0 && index < lastIndex) {
            str = ('\t'.repeat(currentNums + 1)) + str;
            arr[index] = str;
        } else {
            addLessTabPrefix(str, currentNums + 1);
        }
    });
}

export function convertToStr(node, compoArr) {
    node.forEach(item => {
        if (isString(item)) {
            compoArr.push(item);
        } else {
            convertToStr(item, compoArr);
        }
    });
}