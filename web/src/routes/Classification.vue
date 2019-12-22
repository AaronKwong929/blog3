<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <SearchBar></SearchBar>
        <div class="tool-bar">
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
            <el-date-picker
                class="tool-bar-item"
                size="small"
                v-model="time"
                value-format="timestamp"
                type="daterange"
                clearable
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            ></el-date-picker>
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
        </div>
        <el-container style="height: 80vh;">
            <el-main>
                <el-table
                    ref="articleTable"
                    :data="articleList"
                    border
                    row-key="_id"
                    tooltip-effect="dark"
                    style="width: 99%;"
                    height="100%"
                    :default-sort="{ prop: 'updatedAt', order: 'ascending' }"
                    stripe
                >
                    <el-table-column
                        prop="updatedAt"
                        label="发布日期"
                        min-width="20"
                        align="center"
                        sortable
                    ></el-table-column>
                    <el-table-column
                        prop="title"
                        label="标题"
                        min-width="30"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        min-width="30"
                        sortable
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tag"
                        label="标签"
                        min-width="30"
                        sortable
                        align="center"
                    ></el-table-column>
                    <el-table-column label="操作" min-width="10" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="pushToArticle(scope.row._id)"
                                type="text"
                                >查看</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-show="normalPagination"
                    class="pagination"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="articleListCount"
                    :page-sizes="[20, 50, 100]"
                    :page-size="20"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChange"
                ></el-pagination>
                <el-pagination
                    v-show="optionPagination"
                    class="pagination"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="optionArticleListCount"
                    :page-sizes="[20, 50, 100]"
                    :page-size="20"
                    @current-change="optionHandlePageChange"
                    @size-change="optionHandleSizeChange"
                ></el-pagination>
            </el-main>
        </el-container>
    </div>
</template>

<script>
const baseURL = process.env.VUE_APP_API;
const SearchBar = () => import('../components/SearchBar');
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
            pageSize: 20,
            pageIndex: 1,
            articleListCount: 0,
            optionPagination: false,
            optionPageSize: 20,
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
// .tool-bar {
//     display: flex;
//     align-items: flex-end;
// }
</style>
