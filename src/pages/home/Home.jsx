import styles from './home.less';
import React, { useState, useEffect } from 'react';
import ComponentPickingPanel from './components/componentPickingPanel/ComponentPickingPanel.jsx';

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.componentsPickingPanel}>
                <ComponentPickingPanel />
            </div>
            <div className={styles.displayLayoutPanel}></div>
            <div className={styles.editingPanel}></div>
        </div>
    );
}