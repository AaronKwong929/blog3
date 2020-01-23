<template>
    <el-container
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-main>
            <div class="content-wrapper">
                <div v-if="type === 1">搜索标题</div>
                <div v-else>搜索内容</div>
            </div>
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
        }
    },
    mounted() {
        this.getKeyword();
    }
};
</script>

<style lang="scss" scoped>
// /
</style>
