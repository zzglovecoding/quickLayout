/*
 * @Description: componentTree和setComponentTree数据等
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-16 21:37:10
 */
import React, { useState } from 'react';
import { DISPLAY_LAYOUT_WIDTH, DISPLAY_LAYOUT_HEIGHT } from '@/constants/common.js';

const globalSettingsContext = React.createContext({
    settings: {}
});

function settingsHook() {
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [componentTree, setComponentTree] = useState({ 
        current: {
            componentName: 'body',
            uuid: 1,
            width: DISPLAY_LAYOUT_WIDTH,
            height: DISPLAY_LAYOUT_HEIGHT,
            left: 0,
            top: 0
        }, 
        children: [] 
    });

    const handleGridChange = () => {
        setIsShowGrid(!isShowGrid);
    };

    return {
        isShowGrid,
        handleGridChange,
        componentTree,
        setComponentTree
    };
}

export { globalSettingsContext, settingsHook };