import React, { useContext } from 'react';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const sizeData = useContext(pageSizeContext);
    const {
        isShowGrid
    } = useContext(globalSettingsContext);

    const {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    } = hooks(sizeData);

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={handleDragOver}
        style={isShowGrid ? gridProperties : {}}
    >

    </div>);
}