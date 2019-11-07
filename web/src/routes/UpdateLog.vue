<template>
    <div id="log" class="router-view-general">
        <i class="iconfont icon-custom-update"></i>
        <div class="router-title">
            开发日志
        </div>
        <ul class="log-items">
            <li>
                <div class="ver">2019-8-23 开发版本3.0 上线版本1.0</div>
            </li>
            <li>
                <div class="ver">2019-8-26 开发版本3.1 上线版本1.1</div>
                <div class="new">
                    <div class="new-item">登陆持久化</div>
                    <div class="new-item">开发日志页面</div>
                </div>
            </li>
            <li>
                <div class="ver">2019-8-28 开发版本3.2 上线版本1.2</div>
                <div class="new">
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
                <div class="ver">2019-9-8 开发版本3.3 上线版本1.3</div>
                <ul class="new">
                    <li class="new-item">
                        归档/分类/标签页增加全文/标题搜索；搜索结果高亮
                    </li>
                    <li class="new-item">前端处理的分页器</li>
                </ul>
            </li>
            <li>
                <div class="ver">2019-9-30 开发版本3.4.1 上线版本1.4.1</div>
                <ul class="new">
                    <li class="new-item">评论区上线</li>
                    <li class="new-item">项目体积优化，加载速度优化</li>
                </ul>
            </li>
            <li>
                <div class="ver">2019-10-12 开发版本3.5 上线版本1.5</div>
                <ul class="new">
                    <li class="new-item">首页UI更改</li>
                    <li class="new-item">轮播图实现</li>
                    <li class="new-item">增加最近动态栏</li>
                </ul>
            </li>
            <li>
                <div class="ver">2019-10-17 开发版本3.5.1 上线版本1.5.1</div>
                <ul class="new">
                    <li class="new-item">Markdown编辑器重写</li>
                    <li class="new-item">样式修正 大量改用flex</li>
                </ul>
            </li>
            <li>
                <div class="ver">2019-11-7 开发版本3.5.2 上线版本1.5.2</div>
                <ul class="new">
                    <li class="new-item">图片上传和返回</li>
                    <li class="new-item">标签排序</li>
                    <li class="new-item">即将实现后端分页器</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
#log {
    margin-bottom: 1rem;
}
.log-items {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}
.log-items > li {
    margin-top: 1rem;
    box-shadow: 0 0 0.6rem 0.2rem #aaa;
    padding: .6rem;
    border-radius: 1rem;
    width: 80%;
}
.ver {
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 0.3rem;
}
.new {
    line-height: 1.5rem;
}
</style>