<template>
    <div id="admin">
        <div class="btn-group">
            <button @click="logout" class="btn btn-small" title="注销">
                <i class="iconfont icon-logout"></i>
            </button>
            <button @click="newArticle" class="btn btn-small" title="新建文章">
                <i class="iconfont icon-jiahao"></i>
            </button>
        </div>
        <div class="list">
            <div class="published" v-show="this.unpublishedList.length">
                <div class="title">
                    <i class="iconfont icon-detail"></i>未发布({{ this.unpublishedList.length }})
                </div>
                <div class="list-head">
                    <div class="item-head">标题</div>
                    <div class="item-info">分类</div>
                    <div class="item-info">标签</div>
                    <div class="item-info-other">日期</div>
                </div>
                <div
                    v-for="item in this.unpublishedList"
                    :key="item._id"
                    class="list-body"
                >
                    <div class="item-head">{{ item.title }}</div>
                    <div class="item-info">{{ item.type }}</div>
                    <div class="item-info">{{ item.tag }}</div>
                    <div class="item-info-other">{{ item.updatedAt }}</div>
                    <button @click="edit(item._id)" title="修改">
                        <i class="iconfont icon-bianji"></i>
                    </button>
                    <button @click="publish(item._id)" title="发布">
                        <i class="iconfont icon-fabu5"></i>
                    </button>
                    <button @click="deleteArticle(item._id)" title="删除">
                        <i class="iconfont icon-shanchu2"></i>
                    </button>
                </div>
            </div>
            <div class="published" v-show="this.publishedList.length">
                <div class="title">
                    <i class="iconfont icon-fabu5"></i>已发布({{ this.publishedList.length }})
                </div>
                <div class="list-head">
                    <div class="item-head">标题</div>
                    <div class="item-info">分类</div>
                    <div class="item-info">标签</div>
                    <div class="item-info-other">日期</div>
                </div>
                <div
                    v-for="item in this.publishedList"
                    :key="item._id"
                    class="list-body"
                >
                    <div class="item-head">{{ item.title }}</div>
                    <div class="item-info">{{ item.type }}</div>
                    <div class="item-info">{{ item.tag }}</div>
                    <div class="item-info-other">{{ item.updatedAt }}</div>
                    <button @click="publish(item._id)" title="撤回">
                        <i
                            class="iconfont icon-chexiaofanhuichehuishangyibu"
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    // 上线地址: http://106.53.89.236:3000
    // 打包地址: http://127.0.0.1:3000 vue.config.js 注释 devServer.proxy
    // 开发地址: /api vue.config.js 取消 devServer.proxy 注释
    methods: {
        ...mapMutations({
            logout: "LOG_OUT"
        }),
        ...mapActions({
            getArticles: "ADMIN_GET_ARTICLES",
            updateCommonArticles: "COMMON_GET_ARTICLES"
        }),
        newArticle() {
            this.$axios.post("/api/admin/draft").then(() => {
                this.getArticles();
                this.updateCommonArticles();
            });
        },
        async deleteArticle(id) {
            await this.$axios
                .post("/api/admin/delete", {
                    id
                })
                .then(() => {
                    this.getArticles();
                });
            await this.updateCommonArticles();
        },
        async publish(id) {
            await this.$axios
                .put("/api/admin/publish", {
                    id
                })
                .then(() => {
                    this.getArticles();
                });
            await this.updateCommonArticles();
        },
        edit(id) {
            this.$router.push(`/draft/${id}`);
        }
    },
    computed: {
        ...mapState({
            List: state => {
                return state.adminArticleList;
            },
            unpublishedList: state => {
                return state.adminArticleList.filter(item => {
                    return item.published === false;
                });
            },
            publishedList: state => {
                return state.adminArticleList.filter(item => {
                    return item.published === true;
                });
            }
        })
    },
    mounted() {
        this.getArticles();
    }
};
</script>

<style lang="scss" scoped>
.published {
    box-shadow: 0 0 0.6rem 0 #aaa;
    margin: 1rem 3rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
}

.list button {
    margin: 0.5rem;
    font-size: 1rem;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
}

.list button:hover {
    color: black;
    border: none;
    transition: all 0.4s;
}

.list-head {
    margin-top: 1rem;
}

.list-body {
    border-radius: 1rem;
}

.list-body:nth-of-type(2n-1) {
    background-color: rgba(96, 126, 121, 0.28);
}

.list-body:nth-of-type(2n-1) button {
    background-color: rgba(96, 126, 121, 0.28);
}

.list-body:nth-of-type(2n) {
    background-color: rgba(96, 126, 121, 0.4);
}

.list-body:nth-of-type(2n) button {
    background-color: rgba(96, 126, 121, 0.4);
}

.list-head > div{
    display: inline-block;
}

.item-info,
.item-head,
.item-info-other {
    display: inline-block;
}

.item-head {
    width: calc(30% - 1rem);
    padding-left: 1rem;
}

.item-info {
    width: calc(15% - 1rem);
}

.item-info-other {
    width: calc(30% - 1rem);
}

.published > .title {
    box-shadow: 0 0.6rem 0.6rem -0.6rem #aaa;
    padding-bottom: 0.3rem;
}

.btn-group {
    text-align: center;
}

.btn-group button {
    margin: 1rem;
}

button .iconfont {
    // color: rgb(96, 126, 121);
}
</style>
