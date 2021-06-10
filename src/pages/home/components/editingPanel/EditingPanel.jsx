import React, { useContext } from 'react';
import { Input } from 'antd';
import { editingComponentContext } from '../../context/editingComponentContext.js';
import styles from './style.less';

export default function() {
    const {
        editingComponent
    } = useContext(editingComponentContext);

    return (
        <div className={styles.container}>
            <h1>Component being edited now</h1>
            <div className={styles.inputRow}>
                <Input value={editingComponent.width}/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.height}/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.componentName}/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.left}/>
            </div>
            <div className={styles.inputRow}>
                <Input value={editingComponent.top}/>
            </div>
        </div>);
}