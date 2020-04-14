<template>
    <el-container>
        <Loading v-if="loading"></Loading>
        <el-header class="header">
            <el-select
                size="small"
                v-model="searchForm.type"
                clearable
                placeholder="类型"
                class="tool-bar-item"
                @change="changeType"
            >
                <el-option
                    v-for="(item, index) in typeOptions"
                    :key="`type` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option>
            </el-select>
            <el-select
                size="small"
                v-model="searchForm.tag"
                clearable
                placeholder="标签"
                class="tool-bar-item"
                @change="changeTag"
                ><el-option
                    v-for="(item, index) in tagOptions"
                    :key="`tag` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option
            ></el-select>
            <el-input
                size="small"
                class="tool-bar-item"
                placeholder="搜索标题或全文关键词"
                v-model="searchForm.keyword"
                clearable
                style="width: 200px;"
            ></el-input>
            <el-button
                @click.prevent.native="getArticles"
                size="small"
                type="primary"
                >搜索</el-button
            >
        </el-header>
        <el-main class="main">
            <div
                class="article-card"
                v-for="(item, index) in articleList"
                :key="'articleList - ' + index"
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
        <el-footer class="footer">
            <el-pagination
                layout="total, sizes, prev, pager, next"
                :total="articleListCount"
                :page-sizes="[10, 20, 50]"
                :page-size.sync="pageSize"
                :current-page.sync="pageIndex"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import dateFormat from '../utils/dateFormat';
import Loading from '../components/Loading';
export default {
    data() {
        return {
            loading: false,
            searchForm: {
                type: null,
                tag: null,
                keyword: null,
            },
            pageSize: 10,
            pageIndex: 1,
            articleList: [],
            articleListCount: 0,
            // 分类
            typeOptions: [
                { value: `code`, label: `编程` },
                { value: `game`, label: `游戏` },
                { value: `life`, label: `生活` },
            ],
            // 标签
            tagOptions: [
                { value: `html`, label: `HTML` },
                { value: `css`, label: `CSS` },
                { value: `js`, label: `JavaScript` },
                { value: `algo`, label: `算法` },
                { value: `vue`, label: `Vue.JS` },
                { value: `server`, label: `服务器` },
            ],
        };
    },
    methods: {
        getArticles() {
            this.loading = true;
            this.$axios
                .postFetch(this.$api.articleIndex, {
                    pageSize: 10,
                    pageIndex: this.pageIndex,
                    tag: this.searchForm.tag,
                    type: this.searchForm.type,
                    keyword: this.searchForm.keyword,
                })
                .then((res) => {
                    this.articleList = res.resultList;
                    this.articleListCount = res.totalCount;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeType(type) {
            if (type) {
                this.$set(this.searchForm, `type`, type);
            } else {
                this.$set(this.searchForm, `type`, null);
            }
            this.getArticles();
        },
        changeTag(tag) {
            if (tag) {
                this.$set(this.searchForm, `tag`, tag);
            } else {
                this.$set(this.searchForm, `tag`, null);
            }
            this.getArticles();
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getArticles();
        },
        handlePageChange(val) {
            this.pageIndex = val;
            this.getArticles();
        },
        reset() {
            this.pageSize = 20;
            this.pageIndex = 1;
            this.$set(this, `searchForm`, {
                tag: null,
                type: null,
            });
            this.getArticles();
        },
        dateFormatter(row, column) {
            return this.$dateFormat(
                new Date(parseInt(row[column.property])),
                'yyyy-MM-dd hh:mm:ss'
            );
        },
        init() {
            this.getArticles();
        },
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
.main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: calc(100vh - 250px);
}
.article-card {
    flex-direction: column;
    height: 120px;
    width: 45%;
}
</style>
