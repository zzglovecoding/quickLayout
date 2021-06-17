
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

// 根据componentTree生成嵌套结构的dom
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
        return final.join('');
    }
    let final = [open, ...children, close];
    return final.join('');
}

export function getComponentInfomation(finalStrArr, componentTree) {
    let componentArr = [];
    componentArr.push('export default function() {');
    componentArr.push('return(<div className={styles.container}>');

    let str = getData(componentTree).slice(6, -7);
    componentArr.push(str);

    componentArr.push('</div>)');
    componentArr.push('}');
    finalStrArr.push(...componentArr);
}