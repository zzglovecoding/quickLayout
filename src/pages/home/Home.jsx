import styles from './home.less';
import React, { useState, useEffect } from 'react';

export default function Home() {

    return (
        <div className={styles.home}>
            <div className={styles.componentsPickingPanel}>
                
            </div>
            <div className={styles.displayLayoutPanel}></div>
            <div className={styles.editingPanel}></div>
        </div>
    );
}