import React from 'react';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const {
        handleDropInDisplayArea
    } = hooks();

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={e => e.preventDefault()}
    >

    </div>);
}