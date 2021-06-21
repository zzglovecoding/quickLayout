/*
 * @Description: 中间展示区域的逻辑
 * @Author: zzglovecoding
 * @Date: 2021-06-09 20:18:01
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-22 00:00:42
 */
import React, { useContext } from 'react';
import { pageSizeContext } from '../../context/pageSizeContext.js';
import { globalSettingsContext } from '../../context/globalSettingsContext.js';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import { generateElement } from '@/utils/paint.js';
import { ellipsisWord } from '@/utils/common.js';
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
        width,
        height
    } = sizeData;

    const {
        handleDropInDisplayArea,
        generateTickArr
    } = hooks(sizeData, settings, editing);

    let widthTick = generateTickArr(width, 20);
    let heightTick = generateTickArr(height, 20);

    return (<div className={styles.displayLayoutPanelContainer}
        onDrop={handleDropInDisplayArea}
        onDragOver={e => e.preventDefault()}
        id="layoutContainer"
        style={isShowGrid ? gridProperties : {}}
    >
        {
            isShowGrid ? <div className={styles.horizonTick}>
                {
                    widthTick.map(item => {
                        return <div className={styles.horizonItem} key={Math.random()}><span title={item}>{ellipsisWord(item, 2)}</span></div>;
                    })
                }
            </div> : ''
        }
        {
            componentTree.children.map(item => {
                return generateElement(item, setEditingComponent, componentTree, setComponentTree);
            })
        }
        {
            isShowGrid ? <div className={styles.verticalTick}>
                {
                    heightTick.map(item => {
                        return <div className={styles.verticalItem} key={Math.random()}>{item}</div>;
                    })
                }
            </div> : ''
        }
    </div>);
}