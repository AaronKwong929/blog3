<template>
    <el-container
        style="height: 100vh;"
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-header class="header">
            <el-select
                size="small"
                v-model="searchForm.type"
                clearable
                placeholder="类型"
                class="tool-bar-item"
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
                ><el-option
                    v-for="(item, index) in tagOptions"
                    :key="`tag` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option
            ></el-select>
            <el-button
                type="primary"
                size="small"
                @click="getArticles"
                class="tool-bar-item"
                >查询</el-button
            >
            <el-button size="small" @click="reset" class="tool-bar-item"
                >刷新</el-button
            >
            <SearchBar></SearchBar>
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
                layout="total, sizes, prev, pager, next, jumper"
                :total="articleListCount"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
const SearchBar = () => import('../components/SearchBar');
import dateFormat from '../utils/dateFormat';
export default {
    data() {
        return {
            fullScreenLoading: false,
            searchForm: {
                type: null,
                tag: null
            },
            pageSize: 10,
            pageIndex: 1,
            articleList: [],
            articleListCount: 0,
            // 分类
            typeOptions: [
                { value: `code`, label: `编程` },
                { value: `game`, label: `游戏` },
                { value: `life`, label: `生活` }
            ],
            // 标签
            tagOptions: [
                { value: `html`, label: `HTML` },
                { value: `css`, label: `CSS` },
                { value: `js`, label: `JavaScript` },
                { value: `algo`, label: `算法` },
                { value: `vue`, label: `Vue.JS` },
                { value: `server`, label: `服务器` }
            ]
        };
    },
    methods: {
        getArticles() {
            this.fullScreenLoading = true;
            this.$axios
                .postFetch(this.$api.articleIndex, {
                    pageSize: 10,
                    pageIndex: this.pageIndex,
                    tag: this.searchForm.tag,
                    type: this.searchForm.type
                })
                .then(res => {
                    this.articleList = res.resultList;
                    this.articleListCount = res.totalCount;
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
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
                type: null
            });
            this.getArticles();
        },
        dateFormatter(row, column) {
            return this.$dateFormat(
                new Date(parseInt(row[column.property])),
                'yyyy-MM-dd hh:mm:ss'
            );
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
        this.getArticles();
    },
    components: {
        SearchBar
    }
};
</script>

<style lang="scss" scoped>
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
