import path from 'path';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import defineConfig from '@easytool/define-config';
import { name, devEnvironments, parcel } from './package.json';

const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';
const CONTENT_HASH = '[contenthash:8]';
const { globals } = devEnvironments;
const publicPath = parcel.publicPath.endsWith('/') ? parcel.publicPath : parcel.publicPath + '/';
const NODE_ENV = process.env.NODE_ENV;

export default function(config) {
    
    return {
        entry: {
            main: ['./src/index.js']
        },
        output: {
            publicPath: publicPath,
            path: path.resolve(__dirname, BUILD_PATH),
            filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
            chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
            // 避免多个应用之间 jsonpFunction 名冲突
            chunkLoadingGlobal: name
        },
        resolve: {
            // 确保 npm link 时, 优先使用本项目依赖包
            modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
            extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.sass'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                Components: path.resolve(__dirname, 'src/components/'),
                Config: path.resolve(__dirname, 'src/config/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Contexts: path.resolve(__dirname, 'src/contexts/'),
                Pages: path.resolve(__dirname, 'src/pages/'),
                Hooks: path.resolve(__dirname, 'src/hooks/'),
                Fonts: path.resolve(__dirname, 'src/fonts/'),
                Images: path.resolve(__dirname, 'src/images/'),
                Layouts: path.resolve(__dirname, 'src/layouts/'),
                Routes: path.resolve(__dirname, 'src/routes/'),
                Services: path.resolve(__dirname, 'src/services/'),
                Styles: path.resolve(__dirname, 'src/styles/'),
                Utils: path.resolve(__dirname, 'src/utils/')
            }
        },
        optimization: {
            splitChunks: {
                minSize: 10,
                minChunks: 1,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            emitOnErrors: false
        },
        module: {
            rules: [{
                /**
                 * webpack会按顺序查找匹配的loader
                 */
                oneOf: [{
                    /**
                     * 主项目js
                     */
                    test: /\.(js|jsx)?$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }]
                }, {
                    /**
                     * 主项目样式
                     */
                    test: /\.(css|less)$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        }
                    }, 
                    'postcss-loader', 
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }]
                }, {
                    /**
                     * 第三方样式
                     */
                    test: /\.(css|less)$/,
                    exclude: path.resolve(__dirname, 'src'),
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                }, {
                    /**
                     * 全局图片
                     */
                    test: /\.(bmp|png|jpg|jpeg|gif|svg)$/,
                    exclude: path.resolve(__dirname, 'src/fonts'),
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}.[ext]`
                        }
                    }]
                }, {
                    /**
                     * favicon
                     */
                    test: /\.ico$/,
                    include: path.resolve(__dirname, 'src/images'),
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${ASSETS_PATH}/images/[name].[ext]`
                        }
                    }]
                }, {
                    /**
                     * 全局字体
                     */
                    test: /\.(woff|eot|ttf|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}.[ext]`
                        }
                    }]
                // }, {                    
                //     exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.(html|ejs)$/, /\.json$/, /\.bin$/],
                //     use: {
                //         loader: 'file-loader',
                //         options: {
                //             name: `${ASSETS_PATH}/file/[name].${CONTENT_HASH}.[ext]`
                //         }
                //     }
                    // 新 loader 需要加在 file-loader 之前
                }]
            }]
        },
        plugins: [
            // 清除编译目录
            new CleanWebpackPlugin(),
            // JS规范校验
            new ESLintPlugin({
                fix: true,
                extensions: ['js', 'jsx'],
                overrideConfigFile: `.eslintrc${NODE_ENV === 'development' ? '' : '.prod'}.js`
            }),
            // CSS规范校验
            new StyleLintPlugin({
                context: 'src',
                files: '**/*.(c|sc|sa|le)ss',
                fix: true,
                cache: true
            }),
            // 样式提取插件
            new MiniCssExtractPlugin({
                filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
                chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`   // chunk css file
            }),
            // 用于文件拷贝
            new CopyWebpackPlugin({
                patterns: [{
                    from: './src/data',
                    to: `${ASSETS_PATH}/data/`,
                    toType: 'dir'
                }]
            }),
            // moment 库减重插件
            new MomentLocalesPlugin({       
                localesToKeep: ['zh-cn']
            }),
            // index.html 模板插件
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/template.ejs',
                faviconPath: `${publicPath}${ASSETS_PATH}/images/favicon.ico`
            }),
            // 配置全局变量
            new webpack.DefinePlugin({
                ...defineConfig(globals, NODE_ENV === 'development')                       // 'false'表示所有自定义全局变量的值设为 false
            }),
            // 文件大小写检测
            new CaseSensitivePathsPlugin()
        ]
    };
}