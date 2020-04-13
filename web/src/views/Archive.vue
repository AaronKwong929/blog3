<template>
    <el-container>
        <Loading v-if="loading"></Loading>
        <el-main>
            <div
                class="year-wrapper"
                v-for="(item, index) in articleGroupList"
                :key="`agl` + index"
            >
                <div class="year">
                    {{ item.desc }}
                    <el-button
                        size="text"
                        type="success"
                        @click.prevent.native="changeShowStatus(item)"
                        style="margin-left: 10px; color: gray;"
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
            <el-row>
                <el-col style="text-align: center;">
                    <el-link
                        type="info"
                        @click.prevent.native="loadMore"
                        :disabled="loadable"
                        >点击加载更多</el-link
                    >
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import dateFormat from '../utils/dateFormat';
import Loading from '../components/Loading';
export default {
    data() {
        return {
            loading: false,
            pageIndex: 1,
            articleList: [],
            articleListCount: 0,
            articleGroupList: [],
            loadable: false,
        };
    },
    methods: {
        getArticle() {
            this.loading = true;
            this.$axios
                .postFetch(this.$api.articleIndex, {
                    pageSize: 10,
                    pageIndex: this.pageIndex,
                    tag: null,
                    type: null,
                })
                .then((res) => {
                    this.articleList = this.articleList.concat(res.resultList);
                    this.articleListCount = res.totalCount;
                    this.getArticleGroup();
                    this.loadable =
                        this.articleList.length < this.articleListCount
                            ? false
                            : true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        loadMore() {
            if (this.articleListCount > this.articleList.length) {
                this.pageIndex++;
                this.getArticle();
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
                    onShow: true,
                });
            });
        },
        getArticleGroup() {
            this.articleGroupList.forEach((item) => {
                item.articleList = this.articleList.filter((article) => {
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
        init() {
            this.initArticleGroup();
            this.getArticle();
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
    filters: {
        dateFormatter(value) {
            return dateFormat(new Date(parseInt(value)), 'MM-dd hh:mm');
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
