/* 
* @Description: 根据生成出来的配置，产生jsx和less的方法
* @Author: zzg  
* @Date: 2021-06-17 10:23:21  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-17 14:12:59
*/
import { getReactImport, getAntdImport, getComponentInfomation } from './generateSegment.js';

export function generateJSX(componentTree) {
    let finalStrArr = [];
    // -------------react导入信息的生成--------------
    getReactImport(finalStrArr);
    // -------------antd导入信息的生成---------------
    getAntdImport(finalStrArr, componentTree);
    // ------------组件信息的生成--------------------
    getComponentInfomation(finalStrArr, componentTree);
    return finalStrArr;
}