/* 
* @Description: 根据生成出来的配置，产生jsx的方法
* @Author: zzg  
* @Date: 2021-06-17 10:23:21  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-17 14:12:59
*/
import { getReactImport, getAntdImport, getComponentInfomation } from './generateJSXSegment.js';

export function generateJSX(globalSetting) {
    const {
        componentTree,
        hasNetWork
    } = globalSetting;
    
    let finalStrArr = [];
    // -------------react导入信息的生成--------------
    getReactImport(finalStrArr, hasNetWork);
    // -------------antd导入信息的生成---------------
    getAntdImport(finalStrArr, componentTree);
    // ------------组件信息的生成--------------------
    getComponentInfomation(finalStrArr, globalSetting);
    return finalStrArr;
}