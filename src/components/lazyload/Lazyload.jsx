import React, { Suspense } from 'react';
import Loading from 'Components/loading/Loading';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';

/**
 * @param {function} loader - 函数，返回的是import()函数动态加载的内容
 * @param {object} options - 可选配置
 * @property {number} options.loading - 路由加载中显示的组件
 * @property {number} options.error - 路由加载出错显示的组件
 * @property {number} options.delay - 防止页面闪烁的最小加载延迟
 * @property {number} options.timeout - 页面加载最长时间，若超过此时间则报错。注意该时间需要大于delay
 * @returns
 */
export default function Lazyload(loader, options = {}) {
    let { loading: Spin = Loading, error: Error = ErrorBoundary, delay = 300, timeout = 1000 * 30 } = options;
    let clear = (...ids) => ids.forEach(i => clearTimeout(i));

    let LazyComponent = React.lazy(() => {
        let timeoutId = null;
        let delayId = null;

        return Promise.race([
            // 超时抛出reject
            new Promise((_resolve, reject) => {
                timeoutId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    reject('timeout');
                }, timeout);
            }),
            // 设置延迟渲染避免白屏
            new Promise(resolve => {
                delayId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    resolve(loader);
                }, delay);
            })
        ]).then(loader => loader()).catch(err => Promise.reject(new Error(err)));
    });

    return function WrappedComponent(props) {
        return (
            <Error>
                <Suspense fallback={<Spin />}>
                    <LazyComponent {...props} />
                </Suspense>
            </Error>
        );
    };
}
