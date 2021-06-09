import React, { useContext } from 'react';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const sizeData = useContext(pageSizeContext);
    const settings = useContext(globalSettingsContext);

    const {
        isShowGrid
    } = settings;

    const {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    } = hooks(sizeData, settings);

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={handleDragOver}
        id="layoutContainer"
        style={isShowGrid ? gridProperties : {}}
    >

    </div>);
}