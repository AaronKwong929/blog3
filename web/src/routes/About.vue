<template>
    <div
        style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;"
    >
        <div class="card-warpper">
            <el-card class="box-card">
                <div slot="header">
                    <span>关于我</span>
                </div>
                <div class="item">
                    <el-link
                        type="primary"
                        href="https://github.com/AaronKwong929"
                        target="_blank"
                        title="Aaron's GitHub"
                        >Aaron 的 Github</el-link
                    >
                </div>
                <div class="item">
                    <el-link
                        type="success"
                        href="http://aaronkwong.xyz"
                        target="_blank"
                        title="个人主页"
                    >
                        Aaron 的个人主页</el-link
                    >
                </div>
                <div class="item">
                    广东 广州
                </div>
                <div class="item">
                    (即将)毕业于广州大学 计算机学院
                </div>
                <div class="item">
                    (截至 2019/8)半年前端编程经验
                </div>
                <div class="item">
                    大三下学期开始进行前端学习
                </div>
                <div class="item">
                    使用 vue 和 koa 做过小项目
                </div>
                <div class="item">
                    略懂爬虫、数据分析
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <span>关于本博客</span>
                </div>
                <div class="item">
                    vue koa前后端分离开发尝试
                </div>
                <div class="item">
                    前端 Vue.JS 全家桶
                </div>
                <div class="item">
                    后端 Koa.JS
                </div>
                <div class="item">
                    数据库：MongoDb
                </div>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
    display: flex;
    flex-direction: row;
}
/deep/ .el-card {
    width: 40vw;
    display: inline-block;
    vertical-align: top;
    height: 60vh;
}
/deep/ .el-card:first-child {
    margin-right: 1rem;
}
.item {
    margin-bottom: 18px;
    font-size: 14px;
}

.box-card:hover {
    transition: 0.3s;
    transform: scale(1.05)
}
</style>
