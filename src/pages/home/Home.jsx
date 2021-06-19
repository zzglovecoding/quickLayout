/*
 * @Description: 整个页面
 * @Author: zzglovecoding
 * @Date: 2021-06-08 20:39:59
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 01:11:42
 */
import styles from './home.less';
import React from 'react';
import { Input, Switch, Button, Modal, message } from 'antd';
import { pageSizeContext, pageHook } from './context/pageSizeContext.js';
import { globalSettingsContext, settingsHook } from './context/globalSettingsContext.js';
import { editingComponentContext, editingComponentHooks } from './context/editingComponentContext.js';
import { generateJSX } from '@/utils/generate/generateJSX/generateJSXFile.js';
import { generateLess } from '@/utils/generate/generateLess/generateLessFile.js';

import ComponentPickingPanel from './components/componentPickingPanel/ComponentPickingPanel.jsx';
import DisplayLayoutPanel from './components/displayLayoutPanel/DisplayLayoutPanel.jsx';
import EditingPanel from './components/editingPanel/EditingPanel.jsx';

export default function Home() {
    const {
        sizeData
    } = pageHook();

    const globalSetting = settingsHook();
    const editing = editingComponentHooks();

    const {
        realCanvasWidth,
        realCanvasHeight,
        componentTree
    } = globalSetting;

    const handleSend = () => {
        if (!(realCanvasWidth && realCanvasHeight)) {
            message.error('必须输入真实画布的宽高！');
            return;
        }
        if (componentTree.children.length === 0) {
            message.error('还未选择任何布局!');
            return;
        }
        let finalStrArr = generateJSX(globalSetting);
        let lessArr = generateLess(globalSetting);
        Modal.confirm({
            title: <div style={{
                fontSize: '16px',
                margin: '0 auto',
                color: '#374567',
                width: '50px'
            }}>
                File
            </div>,
            icon: null,
            cancelButtonProps: { 
                style: { 
                    display: 'none'
                }
            },
            closable: true,
            okButtonProps: { style: { 
                display: 'none'
            } },
            width: 1000,
            maskClosable: true,
            content:
            <div style={{ whiteSpace: 'pre' }}>
                <div style={{ width: '50%', float: 'left' }}>
                    <div style={{ textAlign: 'center' }}>JSX</div>
                    {
                        finalStrArr.map(item => {
                            return <div className="infoRow" key={Math.random()}
                            >
                                {item}
                            </div>;
                        })
                    }
                </div>
                <div style={{ width: '50%', float: 'left' }}>
                    <div style={{ textAlign: 'center' }}>Less</div>
                    {
                        lessArr.map(item => {
                            return <div className="infoRow" key={Math.random()}
                            >
                                {item}
                            </div>;
                        })
                    }
                </div>
            </div>
            
        });
    };

    return (
        <div className={styles.home}>
            <pageSizeContext.Provider value={sizeData}>
                <globalSettingsContext.Provider value={globalSetting}>
                    <editingComponentContext.Provider value={editing}>
                        <div className={styles.header}>
                            <div className={styles.toolItem}>
                                <Switch checked={globalSetting.isShowGrid} onChange={globalSetting.handleGridChange}/>
                            </div>
                            <div className={styles.toolItem}>
                                <Switch checked={globalSetting.hasNetWork} onChange={globalSetting.handleNetWorkChange}/>
                            </div>
                            <div className={styles.toolItem}>
                                <Input value={globalSetting.realCanvasWidth} onChange={e => globalSetting.handleRealCanvasWidthInput(e.target.value)}/>
                            </div>
                            <div className={styles.toolItem}>
                                <Input value={globalSetting.realCanvasHeight} onChange={e => globalSetting.handleRealCanvasHeightInput(e.target.value)}/>
                            </div>
                            <div className={styles.toolItem}>
                                <Button className={styles.sendButton} onClick={handleSend}>generate!</Button>
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