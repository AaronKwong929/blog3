<template>
    <div id="about" class="router-view-general">
        <i class="iconfont icon-RectangleCopy3"></i>
        <div class="router-title">基于Vue.JS, Koa.js, MongoDB 前后端分离的个人博客</div>
        <div class="more">
            <a href="https://github.com/AaronKwong929" target="_blank" title="Aaron's GitHub"><i class="iconfont icon-icon-test1"></i></a>
            <div class="additional">之后再补充</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#about > .iconfont {
    font-size: 3rem;
    position: absolute;
    top: -2rem;
    left: -1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.more {
    margin-top: 3rem;
}

.more .iconfont {
    font-size: 3rem;
}

.more .iconfont:hover {
    background-color: rgba(96, 126, 121, 0.4);
    border-radius: 50%;
    box-shadow: 0 0 1rem #aaa;
    transition: all 0.5s;
}

.additional {
    margin-top: 1rem;
}
</style>
