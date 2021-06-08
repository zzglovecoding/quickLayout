## 1.1.0 (2021-4-15)
### Features
- 升级 webpack5 以及相关插件
- 升级 antd4, echarts5
- 优化脚手架配置

## 1.0.11 (2021-1-29)
### Features
- 修复<Redirect>组件使用报错的问题.
- 优化异步加载路由时的loading显示问题.

## 1.0.10 (2021-1-22)
### Features
- 优化CICD配置, 将配置项提取为变量.
- 优化nginx配置, 将方案1和方案2合并.

## 1.0.9 (2021-1-15)
### Features
- 增加环境配置脚本environment.js, 根据代码所在分支自动配置环境变量.

## 1.0.8 (2021-1-12)
### Features
- 修改 store 目录, 目录名改为contexts.

## 1.0.7 (2021-1-4)
### Features
- 修改 antd 专用按需引入插件 babel-plugin-import, 替换为通用按需引入插件 babel-plugin-import-less.

## 1.0.6 (2020-12-18)
### Features
- 增加 yarn.lock 文件锁定依赖库.

## 1.0.5 (2020-11-30)
### Features
- 增加 @babel/polyfill 库, 用于兼容性处理.

## 1.0.4 (2020-11-24)
### Features
- 增加 hooks 目录, 用于存放自定义的 hooks.
- 修改 nginx 配置, 增加代理接口配置.

## 1.0.3 (2020-11-23)
### Features
- 修改 containers 目录变更为 pages 目录, 并增加 readme 相关说明.
- 修改 config/settings.js 文件名为 global.js.
- 增加 config/http.js 配置文件, 便于配置全局请求.

## 1.0.2 (2020-11-19)
### Features
- 增加 store 目录用于创建全局的状态, 如: createContext, useContext.
- 增加 CHANGELOG.md 日志文件.

## 1.0.1 (2020-11-17)
### Features
- 增加 CI/CD 配置文件.