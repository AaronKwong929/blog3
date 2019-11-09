# centos 下配置 nginx

## 安装 g++

```cmd
yum install gcc-c++
```

## 安装 nginx 的三个依赖

```cmd
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
```

## 然后去 nginx[官网](http://nginx.org/en/download.html)

选择稳定版(Stable version)（当前版本为 1.16.11）

-> nginx-1.16.1 右键复制下载链接 回到主机命令行 找个文件夹（我找的是/var

```cmd
wget http://nginx.org/en/download.html

等待读条结束

tar -zxvf nginx-1.16.1.tar.gz

然后

cd nginx-1.16.1

./configure

一路等到读条结束，控制台输入

make

再输入

make install
```

## 此时 nginx 安装完成，控制台输入 whereis nginx 找到 nginx 的目录（应该在 usr/local/nginx

进入 nginx 的根目录

```cmd
./nginx -v     有版本号则安装成功
```

做个软链接 ↓ 此处的第二个路径是环境变量的路径，不确定可以用 echo \$PATH 确定

```cmd
ln -s usr/local/nginx/sbin/nginx usr/bin

最好cd / 到最外层目录来做？

然后直接 nginx -v 如果能输出版本号则软链接成功 如果不行就要进去usr/bin rm nginx 再重新在根目录搞一下
```

然后进入 conf 路径

```cmd
cd usr/local/nginx

vi nginx.conf

按 i 进入编辑模式 修改以下代码 按 esc 退出编辑模式，输入 :wq 保存退出
```

原来的 nginx.conf 有很多内容，可以修改成以下这样的

```cmd
worker_processes  1;
pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen 80;
        server_name (你的域名 不用带http);
        charset utf8;
        location / {
          proxy_pass (你的服务ip端口号，要带http);
          proxy_set_header Access-Control-Allow-Origin $http_origin;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_set_header X-Nginx-Proxy true;
          proxy_set_header Connection "";
          proxy_set_header REMOTE-HOST $remote_addr;
          proxy_connect_timeout 180;
          proxy_send_timeout 180;
          proxy_read_timeout 180;
        }
}
}
```

## 然后就是启动 nginx 服务

因为刚刚加了软链接，直接在命令行输入

```cmd
nginx

如果软链接没做好
./usr/local/nginx/sbin/nginx
或者
cd usr/local/nginx/sbin
./nginx
```

## 然后 ps aux 查看进程，有 nginx 的两个进程即可

## 将跨域的设置交给后端 以 koa 为例，使用 koa2-cors

```js
const cors = require('koa2-cors');
app.use(
    cors({
        origin: function(ctx) {
            if (ctx.url === '/test') {
                return false;
            }
            return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
);
```

然后就可以愉快用域名访问了~
