<template>
    <div id="about" class="router-view-general">
        <i class="iconfont icon-guanyu"></i>
        <div class="router-title">
            关于
        </div>
        <div class="about">
            <div id="me" class="section">
                <div class="about-title">关于我</div>
                <div class="about-link">
                    <a
                        href="https://github.com/AaronKwong929"
                        target="_blank"
                        title="Aaron's GitHub"
                        ><i class="iconfont icon-icon-test5"></i
                    ></a>
                    <a
                        href="http://aaronkwong.xyz"
                        target="_blank"
                        title="个人主页"
                        ><i class="iconfont icon-gerentouxiang"></i
                    ></a>
                </div>
                <ul>
                    <li>广东 广州</li>
                    <li>(即将)毕业于广州大学 计算机学院</li>
                    <li>(截至 2019/8)半年前端编程经验</li>
                    <li>大三下学期开始进行前端学习</li>
                    <li>使用 vue 和 koa 做过小项目</li>
                    <li>略懂爬虫、数据分析</li>
                </ul>
            </div>
            <div id="blog" class="section">
                <div class="about-title">关于Blog</div>
                <ul>
                    <li>
                        vue koa前后端分离开发尝试
                    </li>
                    <li>
                        毕业设计
                    </li>
                    <li>
                        想做就做
                    </li>
                    <li>
                        前端 Vue.JS 全家桶
                    </li>
                    <li>
                        后端 Koa.JS
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.section {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 0 0.5rem 0.1rem #aaa;
    border-radius: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
}

.about-title {
    justify-self: center;
    align-self: center;
    font-size: 1.5rem;
    font-weight: 600;
}

.about-link {
    justify-self: center;
    align-self: center;
}

.about-link .iconfont {
    font-size: 2rem;
}

.section > ul > li {
    font-size: 1.1rem;
    line-height: 150%;
    font-weight: 100;
}
</style>
