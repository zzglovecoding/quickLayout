/*
 * @Description: 生成jsx文件信息的一些函数
 * @Author: zzglovecoding
 * @Date: 2021-06-17 20:58:30
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 00:50:27
 */
import { addTabPrefix, convertToStr } from '../generateCommonTools.js';

export function getReactImport(finalStrArr, hasNetWork) {
    let reactImportStr = 'import React from \'react\';';
    let hooksImportStr = 'import hooks from \'./hooks.js\';';
    let lessImportStr = 'import styles from \'./style.less\';';
    finalStrArr.push(reactImportStr);
    if (hasNetWork) {
        finalStrArr.push(hooksImportStr);
    }
    finalStrArr.push(lessImportStr);
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
        let current = `<${node.current.realComponentName} className={styles.${node.current.className ? node.current.className : node.current.realComponentName + node.current.uuid}}/>`;
        return [current];
    }
    let current = `<${node.current.realComponentName} className={styles.${node.current.className ? node.current.className : node.current.realComponentName + node.current.uuid}}>~</${node.current.realComponentName}>`;
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

export function getComponentInfomation(finalStrArr, globalSetting) {
    const {
        componentTree,
        hasNetWork
    } = globalSetting;

    let componentArr = [];
    componentArr.push('export default function() {');
    if (hasNetWork) {
        componentArr.push('\tconst {');
        componentArr.push('');
        componentArr.push('\t} = hooks()');
        componentArr.push('');
    }
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