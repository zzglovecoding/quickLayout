import React, { useState } from 'react';

const globalSettingsContext = React.createContext({
    settings: {}
});

function settingsHook() {
    const [isShowGrid, setIsShowGrid] = useState(false);
    const [componentTree, setComponentTree] = useState({ root: 'root', children: [] });

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