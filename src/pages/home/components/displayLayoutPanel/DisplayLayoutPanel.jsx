import React, { useContext } from 'react';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const sizeData = useContext(pageSizeContext);
    const settings = useContext(globalSettingsContext);
    const editing = useContext(editingComponentContext);

    const {
        isShowGrid
    } = settings;

    const {
        handleDropInDisplayArea,
        handleDragOver,
        gridProperties
    } = hooks(sizeData, settings, editing);

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={handleDragOver}
        id="layoutContainer"
        style={isShowGrid ? gridProperties : {}}
    >

    </div>);
}