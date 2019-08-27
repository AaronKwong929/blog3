<template>
    <div id="about">
        <div class="about-me">
            <div class="about-title">关于我</div>
            <div class="left">
                <ul>
                    <li>现居 广东 广州</li>
                    <li>(截至 2019/8)半年前端编程经验</li>
                    <li>大三下学期开始进行前端学习</li>
                    <li>目前对 html，css，js 有不够深的了解</li>
                    <li>使用过 vue 和 koa 做过小项目</li>
                    <li>副业 python 爬虫和 数据分析</li>
                    <li>(即将)毕业于广州大学</li>
                    <li>计算机科学与网络工程学院 软件工程专业</li>
                </ul>
            </div>
            <div class="right">
                <a
                    href="https://github.com/AaronKwong929"
                    target="_blank"
                    title="Aaron's GitHub"
                    ><i class="iconfont icon-icon-test5"></i
                ></a>
                <a
                    href="http://106.53.89.236:3000"
                    target="_blank"
                    title="个人主页"
                    ><i class="iconfont icon-gerentouxiang"></i
                ></a>
            </div>
        </div>
        <div class="about-blog">
            <div class="about-title">关于本博客</div>
            <ul>
                <li class="li-title">开发原因</li>
                <li class="li-content">
                    <div class="line-through">
                        没有自己搭建的个人博客的前端仔都是咸鱼
                    </div>
                    vue koa前后端分离开发尝试<br />
                    毕业设计?
                </li>
                <li class="li-title">版本号</li>
                <li class="li-content">开发版本3.2 - 上线版本1.2</li>
                <li class="li-title">技术栈</li>
                <li class="li-content">
                    <ul>
                        <li>前端：Vue.JS 全家桶</li>
                        <li>后端：Koa.JS</li>
                    </ul>
                </li>
                <li class="li-title">未来期待实现的内容</li>
                <li class="li-content">
                    <ul>
                        <li>
                            1. 移动端支持
                        </li>
                        <li>
                            2.
                        </li>
                        <li>
                            3.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about-me,
.about-blog {
    vertical-align: top;
    box-shadow: 0 0 1rem 0.2rem #aaa;
    margin: 2rem;
    border-radius: 1rem;
    padding: 2rem;
}

.about-title {
    font-size: 1.5rem;
    font-weight: 600;
    box-shadow: 0 0.3rem 0.3rem -0.2rem #aaa;
    text-align: center;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.about-me ul li {
    line-height: 1.5rem;
    font-size: 1.1rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
}

.iconfont {
    font-size: 2.5rem;
    width: 4rem;
    height: 4rem;
}

.iconfont:hover,
.iconfont:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
    transition: all 0.5s;
}

.about-me a {
    margin: 1rem;
}

.li-title {
    font-size: 1.3rem;
    font-weight: 600;
}

.li-content {
    padding-left: 1rem;
    font-size: 1.1rem;
    font-weight: 300;
    margin-bottom: 1rem;
}

.left,
.right {
    display: inline-block;
    width: 50%;
    vertical-align: top;
}

.line-through {
    text-decoration: line-through;
}
</style>
