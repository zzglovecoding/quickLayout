import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import getBaseConfig from './webpack.config.base';
import { name, parcel } from './package.json';

const { format = 'zip' } = parcel;

export default merge(getBaseConfig(), {
    mode: 'production',
    devtool: 'hidden-source-map',           // 在本地生成sourceMap, 调试时需要搭配Chrome DevTools关联本地sourceMap.
    optimization: {
        minimizer: [
            // Webpack5 默认就是使用的 TerserPlugin, 这样写方便修改配置
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: [{
                    delete: ['./dist']
                }],
                onEnd: [{
                    copy: [{
                        source: './build',
                        destination: `./dist/${name}`
                    }],
                    archive: [{
                        source: './dist',
                        destination: `./dist/${name}.${format}`,
                        format: format
                    }]
                }]
            }
        })
    ]
});