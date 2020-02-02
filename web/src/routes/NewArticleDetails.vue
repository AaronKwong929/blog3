<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-container>
            <el-main style="padding: 0;">
                <div class="header-background">
                    <el-page-header
                        @back="goBack"
                        content="文章详情"
                        class="page-header"
                    ></el-page-header>
                    <div class="header-title">
                        {{ articleDetails.title }}
                    </div>
                    <div class="header-other">
                        <div class="header-time">
                            {{ updatedAt }}
                        </div>
                        <div class="header-type">
                            {{ type }}
                        </div>
                        <div class="header-tag">{{ tag }}</div>
                    </div>
                </div>
                <div class="article-content-wrapper">
                    <div
                        v-if="articleDetails.content"
                        class="article-content"
                        v-highlight
                        v-html="compiledMarkdown"
                    ></div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
import marked from 'marked';
import dateFormat from '../dateFormat';
export default {
    data() {
        return {
            fullScreenLoading: false,
            articleDetails: {}
        };
    },
    methods: {
        goBack() {
            return this.$router.go(-1);
        },
        async getArticleDetails() {
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/common/getArticleDetails`, {
                id: this.$route.params.id
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `获取文章详情失败：${res.data.data}`
                        );
                    }
                    this.$set(this, 'articleDetails', res.data.article);
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    this.$message.error(`获取文章详情失败：服务器错误`);
                });
        }
    },
    computed: {
        updatedAt() {
            return dateFormat(
                new Date(parseInt(this.articleDetails.updatedAt)),
                'yyyy-MM-dd hh:mm:ss'
            );
        },
        tag() {
            switch (this.articleDetails.tag) {
                case 'html':
                    return 'HTML';
                case 'css':
                    return 'CSS';
                case 'js':
                    return 'JavaScript';
                case 'algo':
                    return '算法';
                case 'vue':
                    return 'Vue.JS';
                case 'server':
                    return '服务器';
                default:
                    break;
            }
            return '';
        },
        type() {
            switch (this.articleDetails.type) {
                case 'code':
                    return '编程';
                case 'life':
                    return '生活';
                case 'game':
                    return '游戏';
                default:
                    break;
            }
            return '';
        },
        compiledMarkdown: function() {
            return marked(this.articleDetails.content);
        }
    },
    mounted() {
        this.getArticleDetails();
    }
};
</script>

<style lang="scss" scoped>
.header-background {
    background: linear-gradient(
        225deg,
        rgba($color: #00d090, $alpha: 0.1),
        rgba($color: #00d090, $alpha: 1)
    );
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    .header-title {
        color: rgba(255, 255, 255, 0.801);
        letter-spacing: 0.5rem;
        font: {
            size: 4rem;
            weight: bold;
        }
        margin: 2rem;
    }
    .header-other {
        display: flex;
        flex-direction: row;
        .header-time {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 2rem;
            font-size: 1.3rem;
            font-weight: 300;
        }
        .header-type {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 1rem;
            font-size: 1.3rem;
            font-weight: 300;
        }
        .header-tag {
            color: rgba(255, 255, 255, 0.801);
            margin: 0 1rem;
            font-size: 1.3rem;
            font-weight: 300;
        }
    }
}

.page-header {
    padding: 1rem 0 0 1rem;
    color: rgba(255, 255, 255, 0.801);
}
/deep/ .el-page-header__content {
    color: rgba(255, 255, 255, 0.801);
}

.article-content-wrapper {
    width: 70%;
    margin: 0 auto;
    min-height: 70vh;
    background: rgba($color: #00d090, $alpha: 0.1);
    .article-content {
        padding: 3rem;
    }
}
</style>
