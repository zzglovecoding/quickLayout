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
            importInfoArr.push(componentName.split('-')[1]);
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
    let current = `<${node.current.componentName}>~</${node.current.componentName}>`;
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

// 生成合适的制表符缩进
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

function convertToStr(dom) {
    dom.forEach(item => {

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
    arr.forEach(dom => {
        convertToStr(dom);
    });

    componentArr.push('\t</div>)');
    componentArr.push('}');
    finalStrArr.push(...componentArr);
}