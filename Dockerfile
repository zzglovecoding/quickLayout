# 该镜像继承的父镜像
FROM registry.prod.bbdops.com/common/nginx:1.18.0
# 将项目的打包目录, 如: dist 拷贝到镜像的 /usr/share/nginx/html 目录
ADD dist /usr/share/nginx/html
# 将项目的 nginx.conf 配置拷贝到镜像的 /etc/nginx 目录
ADD nginx.conf /etc/nginx