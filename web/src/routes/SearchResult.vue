<template>
    <el-container
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-main>
            <el-page-header
                @back="goBack"
                :content="type === 1 ? '搜索标题' : '搜索内容'"
                title="返回"
            >
            </el-page-header>
            <div class="content-wrapper" v-if="type === 1">
                <el-card
                    v-for="(item, index) in resultList"
                    :key="index"
                    class="card"
                >
                    <div slot="header">
                        <router-link :to="'/article/' + item._id">{{
                            item.title
                        }}</router-link>
                    </div>
                </el-card>
            </div>

            <el-pagination
                class="pagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                :page-sizes="[5, 10]"
                :page-size="5"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </el-main>
    </el-container>
</template>

<script>
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
export default {
    data() {
        return {
            fullScreenLoading: false,
            keyword: '',
            type: '',
            pageSize: 5,
            pageIndex: 1,
            resultList: [],
            totalCount: 0
        };
    },
    methods: {
        /* 获取搜索内容给和类型 */
        async getKeyword() {
            if (!this.$route.params.keyword || !this.$route.params.type) {
                return this.$message.warning(`请先输入搜索内容`);
            }
            this.keyword = this.$route.params.keyword;
            this.type = this.$route.params.type;
            await this.getResult();
        },
        /* 获取搜素结果 */
        async getResult() {
            await await Axios.post(`${baseURL}/common/searchKeywords`, {
                type: this.type,
                keyword: this.keyword,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    if (res.data.totalCount === 0) {
                        return this.$message.warning(`没有相关结果`);
                    }
                    this.resultList = res.data.resultList;
                    this.totalCount = res.data.totalCount;
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        },
        /* 分页器 */
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getResult();
        },
        handlePageChange(newPage) {
            this.pageIndex = newPage;
            this.getResult();
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.getKeyword();
    }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
    width: 80%;
    margin: 0 auto;
    margin-top: 3rem;
}

.card {
    margin: 0.5rem 0;
}
</style>
