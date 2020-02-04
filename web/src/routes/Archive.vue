<template>
    <el-container
        style="height: 100vh;"
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-header class="header">
            <SearchBar></SearchBar>
        </el-header>
        <el-main v-infinite-scroll="loadMore">
            <div
                class="article-card"
                v-for="(item, index) in archieveList"
                :key="'archieveList - ' + index"
                @click="pushToArticle(item._id)"
            >
                <div class="article-time">
                    <i class="el-icon-date"></i>
                    {{ item.updatedAt | dateFormatter }}
                </div>
                <div class="article-title">
                    {{ item.title }}
                </div>
            </div>
        </el-main>
    </el-container>
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
