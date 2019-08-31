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
                    <div class="new-item">移动端支持</div>
                    <div class="new-item">首页和关于页更新</div>
                    <div class="new-item">
                        时间格式化更新（Linux和Win下格式保持一致）
                    </div>
                    <div class="new-item">
                        各种操作完全整合到actions
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
#log {
    color: rgb(96, 126, 121);
}

.log-items > li {
    margin: 2rem auto;
    box-shadow: 0 0 .6rem .2rem #aaa;
    padding: .5rem;
}

.log-items > li:hover {
    border-radius: 1rem;
    font-size: 1.1rem;
    transition: all .3s
}

.ver {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: .3rem;
}

.new {
    line-height: 1.5rem;
}
</style>