<template>
    <div id="log" class="router-view-general">
        <i class="iconfont icon-custom-update"></i>
        <div class="router-title">
            开发日志
        </div>
        <ul class="log-items">
            <li>
                <div class="ver">2019-8-28 开发版本3.2 上线版本1.2</div>
                <div class="new">
                    <div class="new-item">边栏移动端支持</div>
                    <div class="new-item">首页和关于页更新</div>
                    <div class="new-item">
                        时间格式化更新（Linux和Win下格式保持一致）
                    </div>
                </div>
            </li>
            <li>
                <div class="ver">2019-8-26 开发版本3.1 上线版本1.1</div>
                <div class="new">
                    <div class="new-item">登陆持久化</div>
                    <div class="new-item">开发日志页面</div>
                </div>
            </li>
            <li>
                <div class="ver">2019-8-23 开发版本3.0 上线版本1.0</div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.log-items > li {
    margin: 2rem auto;
}

.ver {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: .3rem;
}

.new {
    line-height: 1.5rem;
}

.new-item {
    font-size: .9rem;
}

.log-items > li {
    box-shadow: 0 0 .6rem .2rem #aaa;
    border-radius: 1rem;
    padding: .5rem;
}
</style>