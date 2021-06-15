import React, { useContext } from 'react';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { generateElement } from '@/utils/paint.js';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const sizeData = useContext(pageSizeContext);
    const settings = useContext(globalSettingsContext);
    const editing = useContext(editingComponentContext);

    const gridProperties = {
        background: '-webkit-linear-gradient(top,transparent 19px,#e1e4e8 20px),-webkit-linear-gradient(left, transparent 19px, #e1e4e8 20px)',
        backgroundSize: '20px 20px'
    };

    const {
        isShowGrid,
        componentTree,
        setComponentTree
    } = settings;

    const {
        setEditingComponent
    } = editing;

    const {
        handleDropInDisplayArea
    } = hooks(sizeData, settings, editing);

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={e => e.preventDefault()}
        id="layoutContainer"
        style={isShowGrid ? gridProperties : {}}
    >
        {
            componentTree.children.map(item => {
                return generateElement(item, setEditingComponent, componentTree, setComponentTree);
            })
        }
    </div>);
}