import styles from './home.less';
import React from 'react';
import { Switch } from 'antd';
import { pageSizeContext, pageHook } from './context/pageSizeContext.js';
import { globalSettingsContext, settingsHook } from './context/globalSettingsContext.js';
import { editingComponentContext, editingComponentHooks } from './context/editingComponentContext.js';

import ComponentPickingPanel from './components/componentPickingPanel/ComponentPickingPanel.jsx';
import DisplayLayoutPanel from './components/displayLayoutPanel/DisplayLayoutPanel.jsx';
import EditingPanel from './components/editingPanel/EditingPanel.jsx';

export default function Home() {
    const {
        sizeData
    } = pageHook();

    const globalSetting = settingsHook();
    const editing = editingComponentHooks();

    return (
        <div className={styles.home}>
            <pageSizeContext.Provider value={sizeData}>
                <globalSettingsContext.Provider value={globalSetting}>
                    <editingComponentContext.Provider value={editing}>
                        <div className={styles.header}>
                            <div className={styles.toolItem}>
                                <Switch checked={globalSetting.isShowGrid} onChange={globalSetting.handleGridChange}/>
                            </div>
                        </div>
                        <div className={styles.workBench}>
                            <div className={styles.componentsPickingPanel}>
                                <ComponentPickingPanel />
                            </div>
                            <div className={styles.displayLayoutPanel} id="displayArea">
                                <DisplayLayoutPanel />
                            </div>
                            <div className={styles.editingPanel}>
                                <EditingPanel />
                            </div>
                        </div>
                        <div className={styles.footer}>
                        拖动快速生成页面布局和组件，请使用1920宽度的屏幕操作
                        </div>
                    </editingComponentContext.Provider>
                </globalSettingsContext.Provider>
            </pageSizeContext.Provider>
        </div>
    );
}