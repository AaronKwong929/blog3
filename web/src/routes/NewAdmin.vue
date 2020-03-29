<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <div class="tool-bar">
            <el-button
                size="small"
                @click="modifyPasswordDialog = true"
                class="tool-bar-item"
                type="warning"
                >修改密码</el-button
            >
            <el-button
                @click="logout"
                type="danger"
                size="small"
                class="tool-bar-item"
                >退出</el-button
            >
        </div>
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
                @click="getArticles"
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
        </div>
        <el-container style="height: 78vh;">
            <el-main>
                <el-table
                    ref="articleTable"
                    :data="articleList"
                    border
                    row-key="_id"
                    tooltip-effect="dark"
                    style="width: 99%;"
                    height="100%"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column
                        prop="updatedAt"
                        label="发布日期"
                        min-width="20"
                        align="center"
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
                        min-width="10"
                        sortable
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tag"
                        label="标签"
                        min-width="10"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="published"
                        label="状态"
                        min-width="10"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.published">已发布</span>
                            <span v-else>未发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="25" align="center">
                        <template slot-scope="scope">
                            <el-button
                                icon="el-icon-s-promotion"
                                size="small"
                                @click="changeArticleStatus(scope.row)"
                                type="text"
                                >{{
                                    scope.row.published ? '撤回' : '发布'
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
                                @click="getComment(scope.row._id)"
                                size="small"
                                type="text"
                                >评价管理</el-button
                            >
                            <el-button
                                icon="el-icon-delete"
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
                    class="pagination"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="articleListCount"
                    :page-sizes="[20, 50, 100]"
                    :page-size="20"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChange"
                ></el-pagination>
            </el-main>
        </el-container>
        <el-dialog
            title="修改密码"
            :visible.sync="modifyPasswordDialog"
            :append-to-body="true"
            :lock-scroll="true"
            :close-on-click-modal="false"
        >
            <el-form
                ref="modifyPasswordForm"
                :model="modifyPasswordForm"
                label-width="100px"
                :rules="modifyPasswordFormRules"
            >
                <el-row>
                    <el-col :span="18" :push="2">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input
                                size="small"
                                type="password"
                                v-model="modifyPasswordForm.oldPassword"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18" :push="2">
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input
                                size="small"
                                type="password"
                                v-model="modifyPasswordForm.newPassword"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18" :push="2">
                        <el-form-item label="重复新密码" prop="newPassword2">
                            <el-input
                                size="small"
                                type="password"
                                v-model="modifyPasswordForm.newPassword2"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="modifyPasswordDialog = false"
                    >取 消</el-button
                >
                <el-button @click="modifyPassword" type="primary"
                    >修 改</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="评论管理"
            :visible.sync="commentDialog"
            :append-to-body="true"
            :lock-scroll="true"
            :close-on-click-modal="false"
            width="80%"
        >
            <el-table
                ref="commentTable"
                :data="commentList"
                border
                row-key="_id"
                tooltip-effect="dark"
                style="width: 99%;"
                height="55vh"
                :default-sort="{ prop: 'createdeAt', order: 'descending' }"
                :row-class-name="tableRowClassName"
            >
                <el-table-column
                    prop="createdAt"
                    label="发布时间"
                    min-width="10"
                    sortable
                    align="center"
                    :formatter="dateFormatter"
                ></el-table-column>
                <el-table-column
                    prop="user"
                    label="作者ID"
                    min-width="10"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="content"
                    label="内容"
                    min-width="20"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="操作" min-width="10" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="changeCommentState(scope.row)"
                            type="text"
                            size="small"
                        >
                            {{ scope.row.published ? `隐藏` : `展示` }}
                        </el-button>
                        <el-button
                            @click="deleteComment(scope.row)"
                            type="text"
                            size="small"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="text-align: right; margin: 1rem 0;">
                <el-pagination
                    class="comment-pagination"
                    layout="total, prev, pager, next, jumper"
                    :total="commentListCount"
                    :page-sizes="[10, 20, 50]"
                    :page-size="10"
                    @current-change="handleCommentPageChange"
                ></el-pagination>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import dateFormat from '../dateFormat';
import Axios from '../axios';
import {
    adminGetArticle,
    adminNewArticle,
    adminChangeArticleStatus,
    adminDeleteDraft,
    adminChangePassword,
    adminGetComment,
    adminChangeCommentStatus,
    adminDeleteComment
} from '../api';
export default {
    data() {
        const checkPasswordSame = (rule, value, callback) => {
            if (value !== this.modifyPasswordForm.newPassword) {
                return callback(new Error(`两次输入密码不一致`));
            }
            callback();
        };
        return {
            // 全屏遮罩
            fullScreenLoading: false,
            // 查询项
            type: null,
            tag: null,
            published: null,
            // 分页器
            pageSize: 20,
            pageIndex: 1,
            articleListCount: 0,
            articleList: [],
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
            /* 修改密码 */
            modifyPasswordDialog: false,
            modifyPasswordForm: {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            modifyPasswordFormRules: {
                oldPassword: [
                    {
                        required: true,
                        trigger: true,
                        message: `旧密码不能为空`
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        trigger: true,
                        message: `新密码不能为空`
                    }
                ],
                newPassword2: [
                    {
                        required: true,
                        trigger: true,
                        message: `新密码不能为空`
                    },
                    {
                        trigger: `change`,
                        validator: checkPasswordSame
                    }
                ]
            },
            /* 评论管理 */
            commentDialog: false,
            commentList: [],
            commentPageIndex: 1,
            commentListCount: 0,
            articleId: ``
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
        /* 获取文章 */
        getArticles() {
            this.fullScreenLoading = true;
            Axios.post(`${adminGetArticle}`, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                published: this.published,
                tag: this.tag,
                type: this.type
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
        /* 新建文章 */
        newArticle() {
            Axios.post(`${adminNewArticle}`)
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
        /* 发布/撤回文章 */
        changeArticleStatus(row) {
            this.fullScreenLoading = true;
            Axios.put(`${adminChangeArticleStatus}`, {
                id: row._id
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `${
                                row.published === true ? '撤回' : '发布'
                            }文章失败：${res.data.message}`
                        );
                    }
                    this.getArticles();
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    return this.$message.error(
                        `${
                            row.published === true ? '撤回' : '发布'
                        }文章失败：服务器错误`
                    );
                });
        },
        /* 编辑文章 */
        pushToDraft(id) {
            this.$router.push(`draft/${id}`);
        },
        /* 删除文章 */
        deleteArticle(row) {
            this.$confirm(`将删除文章: ${row.title}, 是否继续?`, `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.fullScreenLoading = true;
                    Axios.delete(`${adminDeleteDraft}${row._id}`)
                        .then(res => {
                            this.fullScreenLoading = false;
                            if (res.data.status !== 0) {
                                return this.$message.error(
                                    `删除失败：${res.data.message}`
                                );
                            }
                            this.$message.success(`已删除文章: ${row.title}`);
                            this.getArticles();
                        })
                        .catch(() => {
                            this.fullScreenLoading = false;
                            this.$message.error(
                                `删除文章: ${row.title}失败：服务器错误`
                            );
                        });
                })
                .catch(() => {
                    this.$message.warning(`已取消删除文章：${row.title}`);
                });
        },
        tableRowClassName({ row }) {
            if (row.published) {
                return 'on-row';
            }
            return 'off-row';
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getArticles();
        },
        handlePageChange(newPage) {
            this.pageIndex = newPage;
            this.getArticles();
        },
        reset() {
            this.pageSize = 20;
            this.pageIndex = 1;
            this.type = null;
            this.tag = null;
            this.getArticles();
        },
        /* 修改密码 */
        modifyPassword() {
            Axios.put(`${adminChangePassword}`, {
                name: this.$store.state.name,
                oldPassword: this.modifyPasswordForm.oldPassword,
                newPassword: this.modifyPasswordForm.newPassword
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `修改密码失败：${res.data.message}`
                        );
                    }
                    this.$message.success(`修改密码成功，请重新登录`);
                    this.modifyPassworDialog = false;
                    setTimeout(() => {
                        this.$store.commit('LOG_OUT');
                    }, 2000);
                })
                .catch(() => {
                    this.$message.error(`修改密码失败：服务器错误`);
                });
        },
        /* 获取评价 */
        getComment(id) {
            this.articleId = id;
            Axios.get(adminGetComment(id, this.commentPageIndex))
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询评论失败：${res.data.message}`
                        );
                    }
                    if (res.data.totalCount === 0) {
                        return this.$message.warning(`当前文章没有评论`);
                    }
                    this.commentList = res.data.resultList;
                    this.commentListCount = res.data.totalCount;
                    this.commentDialog = true;
                })
                .catch(() => {
                    this.$message.error(`查询评论失败：服务器错误`);
                });
        },
        /* 隐藏/展示评价 */
        changeCommentState(row) {
            Axios.put(`${adminChangeCommentStatus}`, {
                commentId: row._id
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `${row.published ? `隐藏` : `展示`}失败：${
                                res.data.message
                            }`
                        );
                    }
                    this.$message.success(
                        `${row.published ? `隐藏` : `展示`}成功`
                    );
                    this.getComment(row.articleId);
                })
                .catch(() => {
                    this.$message.error(
                        `${row.published ? `隐藏` : `展示`}失败：服务器错误`
                    );
                });
        },
        handleCommentPageChange(val) {
            this.commentPageIndex = val;
            this.getComment(this.articleId);
        },
        deleteComment(row) {
            this.$confirm(`删除这条评论，是否继续？`, `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    Axios.delete(
                        `${adminDeleteComment}${row._id}`
                    )
                        .then(res => {
                            if (res.data.status !== 0) {
                                return this.$message.error(
                                    `删除失败：${res.data.message}`
                                );
                            }
                            this.$message.success(`删除成功`);
                            this.getComment(this.articleId);
                        })
                        .catch(() => {
                            this.$message.error(`删除失败：服务器错误`);
                        });
                })
                .catch(() => {
                    this.$message.info(`已取消删除评论操作`);
                });
        }
    },
    mounted() {
        this.getArticles();
    },
    watch: {
        modifyPasswordDialog(newv) {
            if (newv === false) {
                this.$set(this, `modifyPasswordForm`, {
                    oldPassword: null,
                    newPassword: null,
                    newPassword2: null
                });
            }
        },
        commentDialog(newv) {
            if (newv === false) {
                this.commentPageIndex = 1;
            }
        }
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
/deep/ .el-dialog__body {
    height: 70vh;
}
</style>
