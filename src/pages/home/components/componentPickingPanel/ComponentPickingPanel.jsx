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
                        onDragStart={e => handleDragStart(e, item.type)}
                        onDragEnd={handleDragEnd}
                    >
                        {item.type}
                    </div>;
                })
            }
        </div>
    );
}