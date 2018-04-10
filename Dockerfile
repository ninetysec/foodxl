FROM node:9-alpine
ADD . /src
RUN apk update && apk add bash
RUN cd /src; npm install
RUN npm install forever -g
# 设置时区 为巴黎时间、中国用户请对应修改成 Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
EXPOSE  3000
CMD forever start /src/bin/www