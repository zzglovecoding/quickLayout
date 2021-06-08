import 'Images/favicon.ico';
import 'Styles/main.less';
import httpSettings from 'Config/http';
import http from 'Utils/http';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// 设置http请求的默认参数
http.settings(httpSettings);

render(
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);