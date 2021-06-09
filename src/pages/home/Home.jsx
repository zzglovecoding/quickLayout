import styles from './home.less';
import React from 'react';
import ComponentPickingPanel from './components/componentPickingPanel/ComponentPickingPanel.jsx';
import DisplayLayoutPanel from './components/displayLayoutPanel/DisplayLayoutPanel.jsx';

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.componentsPickingPanel}>
                <ComponentPickingPanel />
            </div>
            <div className={styles.displayLayoutPanel}>
                <DisplayLayoutPanel />
            </div>
            <div className={styles.editingPanel}></div>
        </div>
    );
}