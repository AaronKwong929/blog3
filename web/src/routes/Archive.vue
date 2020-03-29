<template>
    <el-container
        style="height: 100vh;"
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-main v-infinite-scroll="loadMore">
            <div
                class="year-wrapper"
                v-for="(item, index) in articleGroupList"
                :key="`agl` + index"
            >
                <div class="year">
                    {{ item.desc }}
                    <el-button
                        size="small"
                        type="success"
                        @click.prevent.native="changeShowStatus(item)"
                        style="margin-left: 10px;"
                        >{{ item.onShow ? `收起` : `展开` }}</el-button
                    >
                </div>
                <div class="year-article" v-if="item.onShow">
                    <div
                        class="article-card"
                        v-for="(article, index) in item.articleList"
                        :key="`a` + index"
                        @click="pushToArticle(article._id)"
                    >
                        <div class="article-time">
                            <i class="el-icon-date"></i>
                            {{ article.updatedAt | dateFormatter }}
                        </div>
                        <div class="article-title">
                            {{ article.title }}
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import Axios from '../axios';
import dateFormat from '../dateFormat';
import { articleIndex } from '../api';
export default {
    data() {
        return {
            fullScreenLoading: false,
            pageIndex: 1,
            articleList: [],
            articleTotalCount: 0,
            articleGroupList: []
        };
    },
    methods: {
        getArticles() {
            Axios.post(articleIndex, {
                pageSize: 10,
                pageIndex: this.pageIndex,
                tag: null,
                type: null
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    this.articleList = this.articleList.concat(
                        res.data.resultList
                    );
                    this.articleTotalCount = res.data.totalCount;
                    this.getArticleGroup();
                })
                .catch(() => {
                    return this.$message.error(`获取失败，服务器错误`);
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        loadMore() {
            if (this.articleTotalCount > this.articleList.length) {
                this.pageIndex++;
                this.getCommonArticles();
            }
        },
        initArticleGroup() {
            let currentYear = new Date().getFullYear(),
                lastYear = currentYear - 1,
                yearList = [currentYear, lastYear];
            yearList.forEach((item, index) => {
                this.articleGroupList.push({
                    year: item,
                    desc: `${
                        index == yearList.length - 1
                            ? `${item}年及以前`
                            : `${item}年`
                    }`,
                    articleList: [],
                    onShow: true
                });
            });
        },
        getArticleGroup() {
            this.articleGroupList.forEach(item => {
                item.articleList = this.articleList.filter(article => {
                    return (
                        new Date(parseInt(article.updatedAt)).getFullYear() ===
                        item.year
                    );
                });
            });
        },
        changeShowStatus(item) {
            let index = this.articleGroupList.indexOf(item);
            this.$set(
                this.articleGroupList[index],
                `onShow`,
                this.articleGroupList[index].onShow == true ? false : true
            );
        },
        async init() {
            await this.initArticleGroup();
            await this.getArticles();
        }
    },
    filters: {
        dateFormatter(value) {
            return dateFormat(new Date(parseInt(value)), 'MM-dd hh:mm');
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>
.year-wrapper {
    .year {
        font-size: 1.8rem;
        font-weight: 400;
        margin-left: 100px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
