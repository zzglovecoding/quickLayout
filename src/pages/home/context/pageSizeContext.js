/*
 * @Description: 中间那一块展示区域的尺寸数据等
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-16 21:37:30
 */
import React, { useState } from 'react';

const pageSizeContext = React.createContext({
    sizeData: {}
});

function pageHook() {
    // 中间的展示区域的宽高和距离等等
    const [sizeData, setSizeData] = useState({
        left: 320,
        top: 70,
        width: 1199,
        height: 798
    });

    window.onresize = () => {
        // 大小改变的时候，就去设置值，目前不是响应式，用不着
        let canvas = document.getElementById('displayArea').getBoundingClientRect();
        setSizeData(canvas);
    };

    return {
        sizeData
    };
}

export { pageSizeContext, pageHook };