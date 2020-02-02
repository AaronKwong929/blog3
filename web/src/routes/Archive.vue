<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        style="display: flex; flex-direction: column;"
    >
        <SearchBar></SearchBar>
        <el-container style="height: 90vh;">
            <el-main v-infinite-scroll="loadMore">
                <div
                    class="article-card"
                    v-for="(item, index) in archieveList"
                    :key="'archieveList - ' + index"
                    @click="pushToArticle(item._id)"
                >
                    <div class="article-title">
                        {{ item.title }}
                    </div>

                    <div class="article-attributes">
                        <div class="article-attributes-type" v-if="item.type">
                            <i class="el-icon-menu"></i>
                            {{ item.type | typeFormatter }}
                        </div>
                        <div class="article-attributes-tag" v-if="item.tag">
                            <i class="el-icon-collection-tag"></i>
                            {{ item.tag | tagFormatter }}
                        </div>
                    </div>
                    <div class="article-time">
                        <i class="el-icon-date"></i>
                        {{ item.updatedAt | dateFormatter }}
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
const SearchBar = () => import('../components/SearchBar');
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
import dateFormat from '../dateFormat';
export default {
    data() {
        return {
            fullScreenLoading: false,
            pageIndex: 1,
            pageSize: 10,
            archieveList: [],
            archieveListLength: 0
        };
    },
    methods: {
        async getCommonArticles() {
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/common/getCommonArticles`, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `获取文章列表失败：参数错误`
                        );
                    }
                    this.archieveList = this.archieveList.concat(
                        res.data.resultList
                    );
                    this.archieveListLength = res.data.totalCount;
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    return this.$message.error(`获取文章列表失败：服务器错误`);
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        loadMore() {
            if (this.archieveListLength > this.archieveList.length) {
                this.pageIndex++;
                this.getCommonArticles();
            }
        }
    },
    filters: {
        dateFormatter(value) {
            return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd hh:mm:ss');
        },
        tagFormatter(value) {
            if (!value) {
                return '';
            }
            switch (value) {
                case 'html':
                    value = `HTML`;
                    break;
                case 'css':
                    value = `CSS`;
                    break;
                case 'js':
                    value = `JavaScript`;
                    break;
                case 'algo':
                    value = `算法`;
                    break;
                case 'vue':
                    value = `Vue.JS`;
                    break;
                case 'server':
                    value = `服务器`;
                    break;
                default:
                    break;
            }
            return value;
        },
        typeFormatter(value) {
            if (!value) {
                return '';
            }
            switch (value) {
                case `code`:
                    value = `编程`;
                    break;
                case `game`:
                    value = `游戏`;
                    break;
                case `life`:
                    value = `生活`;
                    break;
                default:
                    break;
            }
            return value;
        }
    },
    mounted() {
        this.getCommonArticles();
    },
    components: {
        SearchBar
    }
};
</script>

<style lang="scss" scoped>
.article-card {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    overflow: auto;
    box-shadow: -7px 0 8px -8px rgb(143, 140, 140),
        7px 0 8px -8px rgb(143, 140, 140), 0 7px 8px -8px rgb(143, 140, 140),
        0 -7px 8px -8px rgb(143, 140, 140);
    margin: 1rem auto;
    height: 130px;
    width: 60%;
    padding: 1rem;
    cursor: pointer;
    .article-title {
        font: {
            weight: 300;
            size: 2rem;
        }
    }
    .article-time {
        font: {
            weight: 300;
            size: 1.2rem;
        }
    }
    .article-attributes {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        &-type {
            margin-right: 1rem;
        }
        &-tag {
        }
    }
}
.article-card:hover {
    box-shadow: -7px 0 5px -5px rgb(143, 140, 140),
        7px 0 5px -5px rgb(143, 140, 140), 0 7px 5px -5px rgb(143, 140, 140),
        0 -7px 5px -5px rgb(143, 140, 140);
    transition: all 0.3s;
}
</style>
