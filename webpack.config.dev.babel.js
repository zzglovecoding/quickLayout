import { merge } from 'webpack-merge';
import proxyConfig from '@easytool/proxy-config';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { devEnvironments } from './package.json';
import getBaseConfig from './webpack.config.base';

const { servers, proxies } = devEnvironments;
const baseConfig = getBaseConfig();
const output = baseConfig.output;

export default merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '0.0.0.0',
        port: servers.local,
        http2: false,
        https: false,
        inline: true,
        compress: true,             // gzip 压缩
        disableHostCheck: true,     // 跳过 host 检查
        contentBase: output.path,
        historyApiFallback: {
            index: output.publicPath,
            disableDotRule: true
        },   
        proxy: {
            ...proxyConfig(proxies)
        }
    },
    plugins: [
        // 依赖包大小分析
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
    ]
});