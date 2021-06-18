/*
 * @Description: 生成文件信息的一些函数
 * @Author: zzglovecoding
 * @Date: 2021-06-17 20:58:30
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-18 13:25:20
 */
import { isString } from './common.js';

export function getReactImport(finalStrArr) {
    let reactImportStr = 'import React from \'react\';';
    let lessImportStr = 'import styles from \'./style.less\';';
    finalStrArr.push(reactImportStr, lessImportStr);
    return finalStrArr;
}

export function getAntdImport(finalStrArr, componentTree) {
    let importInfoArr = [];
    let antdComponentImportStr;
    function Ite(node) {
        if (node.children.length > 0) {
            node.children.forEach(item => {
                Ite(item);
            });
        }
        let componentName = node.current.componentName;
        if (componentName.indexOf('-') > 0) {
            let rName = componentName.split('-')[1];
            importInfoArr.push(rName);
            node.current.realComponentName = rName;
        } else {
            node.current.realComponentName = componentName;
        }
    }
    componentTree.children.forEach(item => {
        Ite(item);
    });
    if (importInfoArr.length === 0) {
        antdComponentImportStr = '';
        finalStrArr.push('');
    } else {
        importInfoArr = [...new Set(importInfoArr)];
        antdComponentImportStr = `import { ${importInfoArr.join(',')} } from 'antd';`;
        finalStrArr.push(antdComponentImportStr, '');        
    }
}

// 根据componentTree生成嵌套结构的dom数组
function getData(node) {
    if (node.current.isSingle) {
        let current = `<${node.current.realComponentName} />`;
        return [current];
    }
    let current = `<${node.current.realComponentName}>~</${node.current.realComponentName}>`;
    let children;
    if (node.children.length > 0) {
        children = node.children.map(item => {
            return getData(item);
        });
    }
    let startAndEnd = current.split('~');
    let open = startAndEnd[0];
    let close = startAndEnd[1];
    if (!children) {
        let final = [open, close];
        return final;
    }
    let final = [open, ...children, close];
    return final; 
    
}

// 生成合适个数的制表符缩进
function addTabPrefix(arr, currentNums) {
    arr.forEach((str, index) => {
        if (isString(str)) {
            str = ('\t'.repeat(currentNums)) + str;
            arr[index] = str;
        } else {
            addTabPrefix(str, currentNums + 1);
        }
    });
}

// 把字符串添加到arr当中，准备push到componentArr
function convertToStr(node, compoArr) {
    node.forEach(item => {
        if (isString(item)) {
            compoArr.push(item);
        } else {
            convertToStr(item, compoArr);
        }
    });
}

export function getComponentInfomation(finalStrArr, componentTree) {
    let componentArr = [];
    componentArr.push('export default function() {');
    componentArr.push('\treturn(<div className={styles.container}>');

    let arr = getData(componentTree);
    arr = arr.slice(1, -1);
    arr.forEach(item => {
        addTabPrefix(item, 2);
    });
    let compoArr = [];
    arr.forEach(node => {
        convertToStr(node, compoArr);
    });
    componentArr.push(...compoArr);
    componentArr.push('\t</div>)');
    componentArr.push('}');
    finalStrArr.push(...componentArr);
}