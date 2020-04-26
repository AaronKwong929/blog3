# koa2 引入 babel

[详细教程](https://juejin.im/post/5d6c76ebf265da03db079177#heading-6) 可以看流程图

```cmd
npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/register

```

```json
// package.json scripts
"start": "nodemon app.js --exec babel-node"
```

安装类和装饰器依赖

```cmd
npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

.babelrc 写入

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ]
    ]
}
```

就可以在项目中使用 import / export 和 decorators
