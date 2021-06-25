/*
 * @Description: 整个页面
 * @Author: zzglovecoding
 * @Date: 2021-06-08 20:39:59
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-20 21:37:22
 */
import styles from './home.less';
import React from 'react';
import { Input, Switch, Button, Modal, message, Popover } from 'antd';
import { pageSizeContext, pageHook } from './context/pageSizeContext.js';
import { globalSettingsContext, settingsHook } from './context/globalSettingsContext.js';
import { editingComponentContext, editingComponentHooks } from './context/editingComponentContext.js';
import { fixed } from '@/utils/common.js';
import { getTheEditngNowCount, makeArgsTheSame } from '@/utils/operateTree.js';
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
        handleRealCanvasWidthInput,
        handleRealCanvasHeightInput,
        realCanvasWidth,
        realCanvasHeight,
        componentTree,
        setComponentTree
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

    let wRatio = fixed((globalSetting.realCanvasWidth / 1199), 6);
    let hRatio = fixed((globalSetting.realCanvasHeight / 798), 6);

    const handleAdjust = (type) => {
        let arg = type.split(' ')[1];
        makeArgsTheSame(componentTree, arg);
        setComponentTree({ ...componentTree });
    };

    let editingNowCount = getTheEditngNowCount(componentTree);

    let alignArgs = ['same left', 'same right', 'same top', 'same bottom', 'same height', 'same width'];

    const quickAlignPopover = <div className="PopoverContent">
        {
            alignArgs.map(item => {
                return (
                    <Button className="PopoverContentItem" onClick={() => handleAdjust(item)} key={item}>{item}</Button>
                );
            })
        }
    </div>;

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
                                <Input value={globalSetting.realCanvasWidth} 
                                    onChange={e => globalSetting.handleRealCanvasWidthInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'ArrowUp') {
                                            handleRealCanvasWidthInput(globalSetting.realCanvasWidth + 1);
                                        }
                                        if (e.key === 'ArrowDown') {
                                            handleRealCanvasWidthInput(globalSetting.realCanvasWidth - 1);
                                        }
                                    }}
                                />
                                <div className={styles.ratio} style={{ color: wRatio > 1 ? 'red' : wRatio === 1 ? '' : 'green' }}><span title="红色（绿色）代表真实页面中会被拉伸（压缩）">{wRatio}</span></div>
                            </div>
                            <div className={styles.toolItem}>
                                <Input value={globalSetting.realCanvasHeight} 
                                    onChange={e => globalSetting.handleRealCanvasHeightInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'ArrowUp') {
                                            handleRealCanvasHeightInput(globalSetting.realCanvasHeight + 1);
                                        }
                                        if (e.key === 'ArrowDown') {
                                            handleRealCanvasHeightInput(globalSetting.realCanvasHeight - 1);
                                        }
                                    }}
                                />
                                <div className={styles.ratio} style={{ color: hRatio > 1 ? 'red' : hRatio === 1 ? '' : 'green' }}><span title="红色（绿色）代表真实页面中会被拉伸（压缩）">{hRatio}</span></div>
                            </div>
                            <div className={styles.toolItem}>
                                <Switch checked={globalSetting.isGroupModify} onChange={() => globalSetting.handleGroupModify(editing)}/>
                            </div>
                            <div className={styles.toolItem}>
                                <Popover content={quickAlignPopover} trigger={editingNowCount >= 2 ? 'hover' : 'contextMenu'}>
                                    <Button className={styles.toolBoxButton} disabled={editingNowCount < 2}>quick align</Button>
                                </Popover>
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