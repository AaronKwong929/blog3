# 自动配置后端地址

在 vue 根目录下创建三个文件

.env.dev

.env.prod

.env.test

分别对应开发 生产 测试环境

```cmd
/.env.dev

NODE_ENV = 'development'
VUE_APP_CURRENTMODE = 'dev'
VUE_APP_API = /api
```

```cmd
/.env.test
NODE_ENV = 'production'
VUE_APP_CURRENTMODE = 'prod'
VUE_APP_API = http://106.53.89.236:3000
```

```cmd
/.env.prod

NODE_ENV = 'production'
VUE_APP_CURRENTMODE = 'prod'
VUE_APP_API = xxx
```
