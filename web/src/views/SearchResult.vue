<template>
    <el-container
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        style="height: 100vh;"
    >
        <el-header class="header">
            <el-page-header
                @back="goBack"
                :content="type === 1 ? '搜索标题' : '搜索内容'"
                title="返回"
            >
            </el-page-header>
        </el-header>
        <el-main v-infinite-scroll="loadMore" class="main">
            <div
                class="article-card"
                v-for="(item, index) in resultList"
                :key="'resultList - ' + index"
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
</template>

<script>
import Axios from '../axios';
import dateFormat from '../dateFormat';
import { search } from '../api';
export default {
    data() {
        return {
            fullScreenLoading: false,
            keyword: '',
            type: '',
            pageSize: 10,
            pageIndex: 1,
            resultList: [],
            totalCount: 0
        };
    },
    methods: {
        getKeyword() {
            if (!this.$route.params.keyword || !this.$route.params.type) {
                this.$message.warning(`请先输入搜索内容`);
                return this.$router.go(-1);
            }
            this.keyword = this.$route.params.keyword;
            this.type = this.$route.params.type;
            this.getResult();
        },
        getResult() {
            Axios.post(`${search}`, {
                type: this.type,
                keyword: this.keyword,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    if (res.data.totalCount === 0) {
                        return this.$message.warning(`没有相关结果`);
                    }
                    this.resultList = this.resultList.concat(
                        res.data.resultList
                    );
                    this.totalCount = res.data.totalCount;
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        },
        goBack() {
            this.$router.go(-1);
        },
        loadMore() {
            if (this.totalCount > this.resultList.length) {
                this.pageIndex++;
                this.getResult();
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
        this.getKeyword();
    }
};
</script>

<style lang="scss" scoped>
.header {
    justify-content: flex-start;
}
.main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.article-card {
    flex-direction: column;
    height: 130px;
    width: 45%;
}
</style>
