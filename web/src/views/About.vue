<template>
    <div class="about">
        <Loading v-if="loading"></Loading>
        <div class="box-card">
            <div class="header">
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
        </div>
        <div class="box-card">
            <div class="header">
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
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading';
export default {
    data() {
        return {
            loading: true,
        };
    },
    methods: {
        init() {
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
    mounted() {
        this.init();
    },
    components: {
        Loading,
    },
};
</script>

<style lang="scss" scoped>
.about {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 130px);
    .box-card {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 400px;
        min-height: 400px;
        box-shadow: 0 7px 4px -4px rgba(96, 124, 131, 0.836),
            0 -7px 4px -4px rgba(96, 124, 131, 0.836),
            7px 0 4px -4px rgba(96, 124, 131, 0.836),
            -7px 0 4px -4px rgba(96, 124, 131, 0.836);
        border-radius: 16px;
        transition: all 0.3s;
        .header {
            font: {
                size: 1.6rem;
                font-weight: 400;
            }
        }
        .item {
            margin: 10px 0;
        }
    }
    .box-card:first-child {
        margin-right: 20px;
    }
    .box-card:last-child {
        margin-left: 20px;
    }
    .box-card:hover {
        box-shadow: 0 7px 8px -8px rgba(96, 124, 131, 0.836),
            0 -7px 8px -8px rgba(96, 124, 131, 0.836),
            7px 0 8px -8px rgba(96, 124, 131, 0.836),
            -7px 0 8px -8px rgba(96, 124, 131, 0.836);
        transform: scale(1.1);
        transition: all 0.3s;
    }
}

// .card-wrapper {
//     display: flex;
//     flex-direction: row;
// }
// /deep/ .div {
//     width: 40vw;
//     display: inline-block;
//     vertical-align: top;
//     height: 60vh;
// }
// /deep/ .div:first-child {
//     margin-right: 1rem;
// }
// .item {
//     margin-bottom: 18px;
//     font-size: 14px;
// }

// .box-card:hover {
//     transition: 0.3s;
//     transform: scale(1.05);
// }
</style>
