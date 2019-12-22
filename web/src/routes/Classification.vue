<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
    >
        <div class="tool-bar">
            <div class="tool-bar-item">
                <el-select size="small" v-model="type" clearable placeholder="类型">
                    <el-option
                        v-for="(item, index) in typeOptions"
                        :key="`type` + index"
                        :value="item.value"
                        :label="item.label"
                    ></el-option>
                </el-select>
            </div>
            <div class="tool-bar-item">
                <el-select size="small" v-model="tag" clearable placeholder="标签"
                    ><el-option
                        v-for="(item, index) in tagOptions"
                        :key="`tag` + index"
                        :value="item.value"
                        :label="item.label"
                    ></el-option
                ></el-select>
            </div>
            <div class="tool-bar-item">
                <el-date-picker
                    size="small"
                    v-model="time"
                    value-format="timestamp"
                    type="daterange"
                    clearable
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </div>
            <div class="tool-bar-item">
                <el-button type="primary" size="small" @click="searchArticles"
                    >搜索</el-button
                >
            </div>
            <div class="tool-bar-item">
                <el-button size="small" @click="reset">刷新</el-button>
            </div>
        </div>
        <el-container style="height: 80vh;">
            <el-main>
                <el-table
                    ref="articleTable"
                    :data="articleList"
                    border
                    row-key="id"
                    tooltip-effect="dark"
                    style="width: 99%;"
                    height="100%"
                    :default-sort="{ prop: 'updatedAt', order: 'ascending' }"
                >
                    <el-table-column
                        prop="updatedAt"
                        label="发布日期"
                        min-width="20"
                        align="center"
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
                    <el-table-column label="操作" min-width="15" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="pushToArticle(scope.row._id)"
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
import Axios from '../axios';
export default {
    data() {
        return {
            // 全屏遮罩
            fullScreenLoading: false,
            // 搜索项
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
            await Axios.post(`${baseURL}/common/getCommonArticles`, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(`获取文章失败`);
                    }
                    this.$set(this, 'articleList', res.data.resultList);
                    this.articleListCount = res.data.totalCount;
                })
                .catch(() => {
                    this.$message.error(`获取文章失败：服务器错误`);
                });
        },
        // 搜索文章
        async searchArticles() {
            if (!this.tag && !this.type) {
                return this.$message.warning(`请先输入搜索条件`);
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
                        return this.$message.error(`搜索文章失败`);
                    }
                    this.optionPagination = true;
                    this.normalPagination = false;
                    this.optionArticleListCount = res.data.totalCount;
                    this.$set(this, 'articleList', res.data.resultList);
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    this.$message.error(`搜索文章失败：服务器错误`);
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
    }
};
</script>

<style lang="scss" scoped>
.tool-bar {
    display: flex;
    align-items: flex-end;
}
</style>
