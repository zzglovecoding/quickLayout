import React, { useState, useEffect } from 'react';

const pageSizeContext = React.createContext({
    sizeData: {}
});

function pageHook() {
    const [sizeData, setSizeData] = useState({
        left: 300,
        top: 50,
        width: 1261,
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