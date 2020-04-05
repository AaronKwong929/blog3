<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <div class="tool-bar">
            <el-button
                size="small"
                @click.prevent.native="updatePwdDialog = true"
                class="tool-bar-item"
                type="warning"
                >修改密码</el-button
            >
            <el-button
                @click.prevent.native="logout"
                type="danger"
                size="small"
                class="tool-bar-item"
                >退出</el-button
            >
        </div>
        <div class="tool-bar">
            <el-select
                size="small"
                v-model="searchForm.type"
                clearable
                placeholder="类型"
                class="tool-bar-item"
                @change="getArticle"
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
                @change="getArticle"
                ><el-option
                    v-for="(item, index) in tagOptions"
                    :key="`tag` + index"
                    :value="item.value"
                    :label="item.label"
                ></el-option
            ></el-select>
            <el-select
                size="small"
                v-model="searchForm.published"
                clearable
                placeholder="状态"
                class="tool-bar-item"
                @change="getArticle"
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
                @click.prevent.native="newArticle"
                class="tool-bar-item"
                >新建</el-button
            >
            <el-button size="small" @click.prevent.native="reset" class="tool-bar-item"
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
                                @click.prevent.native="changeArticleStatus(scope.row)"
                                type="text"
                                >{{
                                    scope.row.published ? '撤回' : '发布'
                                }}</el-button
                            >
                            <el-button
                                icon="el-icon-edit"
                                size="small"
                                @click.prevent.native="pushToDraft(scope.row._id)"
                                type="text"
                                :disabled="scope.row.published"
                                >编辑</el-button
                            >
                            <el-button
                                @click.prevent.native="getComment(scope.row._id)"
                                size="small"
                                type="text"
                                >评价管理</el-button
                            >
                            <el-button
                                icon="el-icon-delete"
                                size="small"
                                @click.prevent.native="deleteArticle(scope.row)"
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
            :visible.sync="updatePwdDialog"
            :append-to-body="true"
            :lock-scroll="true"
            :close-on-click-modal="false"
        >
            <el-form
                ref="updatePwdForm"
                :model="updatePwdForm"
                label-width="100px"
                :rules="updatePwdFormRules"
            >
                <el-row>
                    <el-col :span="18" :push="2">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input
                                size="small"
                                type="password"
                                v-model="updatePwdForm.oldPassword"
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
                                v-model="updatePwdForm.newPassword"
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
                                v-model="updatePwdForm.newPassword2"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click.prevent.native="updatePwdDialog = false"
                    >取 消</el-button
                >
                <el-button @click.prevent.native="modifyPassword" type="primary"
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
                            @click.prevent.native="changeCommentState(scope.row)"
                            type="text"
                            size="small"
                        >
                            {{ scope.row.published ? `隐藏` : `展示` }}
                        </el-button>
                        <el-button
                            @click.prevent.native="deleteComment(scope.row)"
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
import dateFormat from '../utils/dateFormat';

export default {
    data() {
        const checkPasswordSame = (rule, value, callback) => {
            if (value !== this.updatePwdForm.newPassword) {
                return callback(new Error(`两次输入密码不一致`));
            }
            callback();
        };
        return {
            fullScreenLoading: false,
            searchForm: {
                type: null,
                tag: null,
                published: null
            },
            pageSize: 20,
            pageIndex: 1,
            articleListCount: 0,
            articleList: [],
            typeOptions: [
                { value: `code`, label: `编程` },
                { value: `game`, label: `游戏` },
                { value: `life`, label: `生活` }
            ],
            tagOptions: [
                { value: `html`, label: `HTML` },
                { value: `css`, label: `CSS` },
                { value: `js`, label: `JavaScript` },
                { value: `algo`, label: `算法` },
                { value: `vue`, label: `Vue.JS` },
                { value: `server`, label: `服务器` }
            ],
            publishOptions: [
                { value: false, label: `未发布` },
                { value: true, label: `已发布` }
            ],
            updatePwdDialog: false,
            updatePwdForm: {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            updatePwdFormRules: {
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
            commentDialog: false,
            commentList: [],
            commentPageIndex: 1,
            commentListCount: 0,
            articleId: ``
        };
    },
    methods: {
        logout() {
            return this.$login.logout();
        },
        dateFormatter(row, column) {
            return dateFormat(
                new Date(parseInt(row[column.property])),
                'yyyy-MM-dd hh:mm:ss'
            );
        },
        getArticle() {
            this.fullScreenLoading = true;
            this.$axios
                .postFetch(this.$api.adminGetArticle, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    published: this.searchForm.published,
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
        newArticle() {
            this.fullScreenLoading = true;
            this.$axios
                .postFetch(this.$api.adminNewArticle)
                .then(res => {
                    this.$router.push(
                        `${this.$api.adminNewArticle}${res.data.id}`
                    );
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        changeArticleStatus(row) {
            this.fullScreenLoading = true;
            this.$axios
                .putFetch(this.$api.adminChangeArticleStatus, {
                    id: row._id
                })
                .then(() => {
                    this.$message.success(
                        `${row.published ? `撤回` : `发布`}文章：${
                            row.title
                        } 成功`
                    );
                    this.getArticle();
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        pushToDraft(id) {
            this.$router.push(`draft/${id}`);
        },
        deleteArticle(row) {
            this.$confirm(`将删除文章: ${row.title}, 是否继续?`, `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.fullScreenLoading = true;
                    this.$axios
                        .deleteFetch(`${this.$api.adminDeleteDraft}${row._id}`)
                        .then(() => {
                            this.$message.success(`已删除文章: ${row.title}`);
                            this.getArticle();
                        })
                        .finally(() => {
                            this.fullScreenLoading = false;
                        });
                })
                .catch(() => {
                    this.$message.warning(`已取消删除文章`);
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
            this.getArticle();
        },
        handlePageChange(newPage) {
            this.pageIndex = newPage;
            this.getArticle();
        },
        reset() {
            this.pageSize = 20;
            this.pageIndex = 1;
            this.$set(this, `searchForm`, {
                published: null,
                tag: null,
                type: null
            });
            this.getArticle();
        },
        modifyPassword() {
            this.fullScreenLoading = false;
            this.$axios
                .putFetch(this.$api.adminChangePassword, {
                    name: localStorage.getItem(`name`),
                    oldPassword: this.updatePwdForm.oldPassword,
                    newPassword: this.updatePwdForm.newPassword
                })
                .then(() => {
                    this.$message.success(`修改密码成功，请重新登录`);
                    this.modifyPassworDialog = false;
                    this.$login.logout();
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        /* 获取评价 */
        getComment(id) {
            this.fullScreenLoading = true;
            this.articleId = id;
            this.$axios
                .getFetch(this.$api.adminGetComment(id, this.commentPageIndex))
                .then(res => {
                    if (res.data.totalCount === 0) {
                        return this.$message.warning(`当前文章没有评论`);
                    }
                    this.commentList = res.resultList;
                    this.commentListCount = res.totalCount;
                    this.commentDialog = true;
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        changeCommentState(row) {
            this.fullScreenLoading = true;
            this.$axios
                .putFetch(this.$axios.adminChangeCommentStatus, {
                    commentId: row._id
                })
                .then(() => {
                    this.$message.success(
                        `${row.published ? `隐藏` : `展示`}成功`
                    );
                    this.getComment(row.articleId);
                })
                .finally(() => {
                    this.fullScreenLoading = false;
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
                    this.fullScreenLoading = true;
                    this.$axios
                        .deleteFetch(
                            `${this.$api.adminDeleteComment}${row._id}`
                        )
                        .then(() => {
                            this.$message.success(`删除成功`);
                            this.getComment(this.articleId);
                        })
                        .finally(() => {
                            this.fullScreenLoading = false;
                        });
                })
                .catch(() => {
                    this.$message.warning(`已取消删除评论`);
                });
        }
    },
    mounted() {
        this.getArticle();
    },
    watch: {
        updatePwdDialog(newv) {
            if (newv === false) {
                this.$set(this, `updatePwdForm`, {
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
    background: rgb(255, 252, 247);
}
/deep/ .el-table .on-row {
    background: #effce8;
}
/deep/ .el-dialog__body {
    height: 70vh;
}
</style>
