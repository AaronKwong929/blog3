# 关于如何激活 backtop

前置步骤全部走[文档](https://element.eleme.cn/#/zh-CN/component/backtop)流程

想要在全局使用 backtop，要在 app.vue 下写以下配置

html 部分

```js
<template>
    <div id="app">
        <Sidebar></Sidebar>
        <div class="router-views">
            <template>
                <el-backtop target=".router-views"></el-backtop>
            </template>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>
```

css 部分是激活重点

```css
.router-views {
    height: 100vh;
}
```

设置高度即可激活 backtop

设置任何高度都可以
