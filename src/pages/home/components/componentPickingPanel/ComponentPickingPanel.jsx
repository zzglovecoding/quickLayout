/*
 * @Description: 左侧的组件挑选栏
 * @Author: zzglovecoding
 * @Date: 2021-06-09 00:27:13
 * @LastEditors: zzglovecoding
 * @LastEditTime: 2021-06-16 21:37:59
 */
import React from 'react';
import data from '@/data/pageComponents.json';
import styles from './style.less';
import hooks from './hooks.js';

export default function() {
    const {
        handleDragStart,
        handleDragEnd
    } = hooks();

    return (
        <div className={styles.itemsContainer}>
            {
                data.map(item => {
                    return <div className={styles.componentItem}
                        key={item.id}
                        draggable={true}
                        onDragStart={e => handleDragStart(e, item.type, item.isSingle)}
                        onDragEnd={handleDragEnd}
                    >
                        {item.type}
                    </div>;
                })
            }
        </div>
    );
}