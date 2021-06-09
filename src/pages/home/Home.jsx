import styles from './home.less';
import React from 'react';
import ComponentPickingPanel from './components/componentPickingPanel/ComponentPickingPanel.jsx';
import DisplayLayoutPanel from './components/displayLayoutPanel/DisplayLayoutPanel.jsx';

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.header}>
                布局快速生成工具
            </div>
            <div className={styles.workBench}>
                <div className={styles.componentsPickingPanel}>
                    <ComponentPickingPanel />
                </div>
                <div className={styles.displayLayoutPanel}>
                    <DisplayLayoutPanel />
                </div>
                <div className={styles.editingPanel}></div>
            </div>
            <div className={styles.footer}>
                拖动快速生成页面布局和组件，请使用1920宽度的屏幕操作
            </div>
        </div>
    );
}