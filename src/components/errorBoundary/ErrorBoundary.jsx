import styles from './errorBoundary.less';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: null,
            errorMsgMap: { // 错误信息对应提示文字
                timeout: '抱歉，加载超时！'
            }
        };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true, errorMsg: error.message };
    }

    // componentDidCatch (error, errorInfo) {
    //     // 你同样可以将错误日志上报给服务器
    //     logErrorToMyService(error, errorInfo);
    // }

    render() {
        let { errorMsgMap, hasError, errorMsg } = this.state;

        if (hasError !== false) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <Result
                    status="warning"
                    title={errorMsgMap[errorMsg] || '抱歉，加载失败！'}
                    extra={<Button type="primary" key="console" onClick={() => window.location.reload(true)}>重新加载</Button>}
                    className={styles.errorBoundary}
                />
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};