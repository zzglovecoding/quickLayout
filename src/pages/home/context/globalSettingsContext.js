import React, { useState } from 'react';

const globalSettingsContext = React.createContext({
    settings: {}
});

function settingsHook() {
    const [isShowGrid, setIsShowGrid] = useState(false);

    const handleGridChange = () => {
        setIsShowGrid(!isShowGrid);
    };

    return {
        isShowGrid,
        handleGridChange
    };
}

export { globalSettingsContext, settingsHook };