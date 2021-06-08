import styles from './loading.less';
import { Spin } from 'antd';
import React from 'react';

export default function Loading() {
    
    return (
        <Spin size="large" tip="页面加载中..." className={styles.loading} />
    );
}