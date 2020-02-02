<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
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
            <el-select
                size="small"
                v-model="published"
                clearable
                placeholder="状态"
                class="tool-bar-item"
                ><el-option
                    v-for="(item, index) in publishOptions"
                    :key="`published` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                size="small"
                @click="searchArticles"
                class="tool-bar-item"
                >查询</el-button
            >
            <el-button
                type="success"
                size="small"
                @click="newArticle"
                class="tool-bar-item"
                >新建</el-button
            >
            <el-button size="small" @click="reset" class="tool-bar-item"
                >刷新</el-button
            >
            <el-button
                @click="logout"
                type="warning"
                size="small"
                class="tool-bar-item"
                >退出</el-button
            >
        </div>
        <el-container style="height: 85vh;">
            <el-main>
                <el-table
                    ref="articleTable"
                    :data="articleList"
                    border
                    row-key="_id"
                    tooltip-effect="dark"
                    style="width: 99%;"
                    height="100%"
                    :default-sort="{ prop: 'updatedAt', order: 'descending' }"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column
                        prop="updatedAt"
                        label="发布日期"
                        min-width="20"
                        align="center"
                        sortable
                        :formatter="dateFormatter"
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
                        min-width="15"
                        sortable
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tag"
                        label="标签"
                        min-width="15"
                        sortable
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="published"
                        label="状态"
                        min-width="10"
                        sortable
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.published">已发布</span>
                            <span v-else>未发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="20" align="center">
                        <template slot-scope="scope">
                            <el-button
                                icon="el-icon-s-promotion
"
                                size="small"
                                @click="changeArticleStatus(scope.row)"
                                type="text"
                                >{{
                                    scope.row.published ? '撤下' : '发布'
                                }}</el-button
                            >
                            <el-button
                                icon="el-icon-edit"
                                size="small"
                                @click="pushToDraft(scope.row._id)"
                                type="text"
                                :disabled="scope.row.published"
                                >编辑</el-button
                            >
                            <el-button
                                icon="el-icon-delete
"
                                size="small"
                                @click="deleteArticle(scope.row)"
                                type="text"
                                :disabled="scope.row.published"
                                >删除</el-button
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
import { mapMutations } from 'vuex';
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
            published: '',
            // 分页器
            normalPagination: true,
            pageSize: 20,
            pageIndex: 1,
            articleListCount: 0,
            articleList: [],
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
            // 是否发布
            publishOptions: [
                { value: false, label: `未发布` },
                { value: true, label: `已发布` }
            ],
            
        };
    },
    methods: {
        ...mapMutations({
            logout: 'LOG_OUT'
        }),
        // 格式化时间
        dateFormatter(row, column) {
            return dateFormat(
                new Date(parseInt(row[column.property])),
                'yyyy-MM-dd hh:mm:ss'
            );
        },
        // // 获取文章
        async getArticles() {
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/admin/getArticles`, {
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
            if (!this.tag && !this.type && this.published === '') {
                return this.$message.warning(`请先输入查询条件`);
            }
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/admin/searchArticles`, {
                pageIndex: this.optionPageIndex,
                pageSize: this.optionPageSize,
                type: this.type,
                tag: this.tag,
                published: this.published + ''
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
        // 新建文章
        async newArticle() {
            await await Axios.post(`${baseURL}/admin/newArticle`)
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `新建文章失败：${res.data.message}`
                        );
                    }
                    this.$message.success(`新建文章成功`);
                    this.$router.push(`/draft/${res.data.id}`);
                })
                .catch(() => {
                    this.$message.error(`新建文章失败：服务器错误`);
                });
        },
        // 发布/撤回文章
        async changeArticleStatus(row) {
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/admin/changeArticleStatus`, {
                id: row._id
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `${
                                row.published === true ? '撤下' : '发布'
                            }文章失败：${res.data.message}`
                        );
                    }
                    this.$message.success(`${res.data.message}`);
                    this.getArticles();
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    return this.$message.error(
                        `${
                            row.published === true ? '撤下' : '发布'
                        }文章失败：服务器错误`
                    );
                });
        },
        // 编辑文章
        pushToDraft(id) {
            this.$router.push(`draft/${id}`);
        },
        // 删除文章
        async deleteArticle(row) {
            this.$confirm(`将删除文章: ${row.title}, 是否继续?`, `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.fullScreenLoading = true;
                    await Axios.post(`${baseURL}/admin/deleteArticle`, {
                        id: row._id
                    })
                        .then(res => {
                            this.fullScreenLoading = false;
                            if (res.data.status !== 0) {
                                return this.$message.error(
                                    `删除失败：${res.data.message}`
                                );
                            }
                            this.$message.success(`已删除文章: ${row.title}`);
                            if (this.normalPagination) {
                                this.getArticles();
                            } else {
                                this.searchArticles();
                            }
                        })
                        .catch(() => {
                            this.fullScreenLoading = false;
                            this.$message.error(
                                `删除文章: ${row.title}失败：服务器错误`
                            );
                        });
                })
                .catch(() => {
                    this.$message.warning(`已取消删除文章：${row.title}操作`);
                });
        },
        // 区分底色
        tableRowClassName({ row }) {
            if (row.published) {
                return 'on-row';
            }
            return 'off-row';
        },
        // 分页器
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getArticles();
        },
        handlePageChange(newPage) {
            this.pageIndex = newPage;
            this.getArticles();
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
            this.tag = '';
            this.getArticles();
        }
    },
    mounted() {
        this.getArticles();
    }
};
</script>

<style lang="scss" scoped>
/deep/ .el-table .off-row {
    background: oldlace;
}
/deep/ .el-table .on-row {
    background: #f0f9eb;
}
</style>
