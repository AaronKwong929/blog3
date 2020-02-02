<template>
    <el-container
        style="height: 100vh;"
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-header class="header">
            <el-select
                size="small"
                v-model="type"
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
                v-model="tag"
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
                @click="searchArticles"
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
                v-show="normalPagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="articleListCount"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
            ></el-pagination>
            <el-pagination
                v-show="optionPagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="optionArticleListCount"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                @current-change="optionHandlePageChange"
                @size-change="optionHandleSizeChange"
            ></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
const baseURL = process.env.VUE_APP_API;
const SearchBar = () => import('../components/SearchBar');
import dateFormat from '../dateFormat';
import Axios from '../axios';
export default {
    data() {
        return {
            // 全屏遮罩
            fullScreenLoading: false,
            // 查询项
            type: '',
            tag: '',
            time: '',
            // 分页器
            normalPagination: true,
            pageSize: 10,
            pageIndex: 1,
            articleListCount: 0,
            optionPagination: false,
            optionPageSize: 10,
            optionPageIndex: 1,
            optionArticleListCount: 0,
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
            ],
            // 文章
            articleList: []
        };
    },
    methods: {
        // // 获取文章
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
                            `获取文章失败：${res.data.message}`
                        );
                    }
                    this.$set(this, 'articleList', res.data.resultList);
                    this.articleListCount = res.data.totalCount;
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    this.$message.error(`获取文章失败：服务器错误`);
                });
        },
        // 查询文章
        async searchArticles() {
            if (!this.tag && !this.type) {
                return this.$message.warning(`请先输入查询条件`);
            }
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/common/searchCommonArticles`, {
                pageIndex: this.optionPageIndex,
                pageSize: this.optionPageSize,
                type: this.type,
                tag: this.tag,
                time: this.time
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询文章失败：${res.data.message}`
                        );
                    }
                    this.optionPagination = true;
                    this.normalPagination = false;
                    this.optionArticleListCount = res.data.totalCount;
                    this.$set(this, 'articleList', res.data.resultList);
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    this.$message.error(`查询文章失败：服务器错误`);
                });
        },
        // 查看文章
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        // 分页器
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getCommonArticles();
        },
        handlePageChange(newPage) {
            this.pageIndex = newPage;
            this.getCommonArticles();
        },
        optionHandleSizeChange(newSize) {
            this.optionPageSize = newSize;
            this.searchArticles();
        },
        optionHandlePageChange(newPage) {
            this.optionPageIndex = newPage;
            this.searchArticles();
        },
        reset() {
            this.normalPagination = true;
            this.pageSize = 20;
            this.pageIndex = 1;
            this.articleListCount = 0;
            this.optionPagination = false;
            this.optionPageSize = 20;
            this.optionPageIndex = 1;
            this.optionArticleListCount = 0;
            this.type = '';
            this.time = '';
            this.tag = '';
            this.getCommonArticles();
        },
        // 格式化时间
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
        this.getCommonArticles();
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
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    overflow: auto;
    box-shadow: -7px 0 8px -8px rgb(143, 140, 140),
        7px 0 8px -8px rgb(143, 140, 140), 0 7px 8px -8px rgb(143, 140, 140),
        0 -7px 8px -8px rgb(143, 140, 140);
    margin: 1rem auto;
    height: 130px;
    width: 45%;
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
        font: {
            weight: 300;
            size: 1.1rem;
        }
        &-type {
            margin-right: 1rem;
            padding-right: 1rem;
            box-shadow: 5px 0 5px -5px rgb(143, 140, 140);
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
