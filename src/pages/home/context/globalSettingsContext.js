/*
 * @Description: componentTree和setComponentTree数据等
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 01:10:35
 */
import React, { useState } from 'react';
import { DISPLAY_LAYOUT_WIDTH, DISPLAY_LAYOUT_HEIGHT } from '@/constants/common.js';

const globalSettingsContext = React.createContext({
    settings: {}
});

function settingsHook() {
    const [realCanvasWidth, setRealCanvasWidth] = useState(1199);
    const [realCanvasHeight, setRealCanvasHeight] = useState(798);
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [hasNetWork, setHasNetWork] = useState(false);
    const [componentTree, setComponentTree] = useState({ 
        current: {
            componentName: 'body',
            uuid: 1,
            width: DISPLAY_LAYOUT_WIDTH,
            height: DISPLAY_LAYOUT_HEIGHT,
            left: 0,
            top: 0,
            isSingle: false,
            realComponentName: 'container',
            className: 'container'
        }, 
        children: [] 
    });

    const handleNetWorkChange = () => {
        setHasNetWork(!hasNetWork);
    };

    const handleGridChange = () => {
        setIsShowGrid(!isShowGrid);
    };

    const handleRealCanvasWidthInput = value => {
        setRealCanvasWidth(value);
    };

    const handleRealCanvasHeightInput = value => {
        setRealCanvasHeight(value);
    };

    return {
        realCanvasWidth,
        handleRealCanvasWidthInput,
        realCanvasHeight,
        handleRealCanvasHeightInput,
        hasNetWork,
        handleNetWorkChange,
        isShowGrid,
        handleGridChange,
        componentTree,
        setComponentTree
    };
}

export { globalSettingsContext, settingsHook };