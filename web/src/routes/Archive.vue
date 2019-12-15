<template>
    <div id="archive">
        <div class="tool-bar">
            <SearchBar></SearchBar>
            <!-- <el-button
                @click="loadMoreArticles"
                :disabled="
                    !(this.$store.state.currentPage <= this.$store.state.pageCount)
                "
            >
                加载更多
            </el-button> -->
        </div>
        <el-table
            :data="archieveList"
            height="70vh"
            :default-sort="{ prop: 'updatedAt', order: 'descending' }"
            stripe
            tooltip-effect="dark"
        >
            <el-table-column
                prop="updatedAt"
                label="日期"
                min-width="60"
                sortable
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                align="center"
                min-width="60"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                align="center"
                min-width="60"
                sortable
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 'code'">编程</span>
                    <span v-else-if="scope.row.type === 'game'">游戏</span>
                    <span v-else>生活</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="tag"
                label="标签"
                align="center"
                min-width="90"
            ></el-table-column>
            <el-table-column align="center" label="操作" min-width="30">
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
            class="pagination"
            :page-size="10"
            :page-sizes="[10, 20, 50, 100]"
            :total="archieveListLength"
            :current-page="1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex';
const SearchBar = () => import('../components/SearchBar');
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            archieveList: [],
            archieveListLength: 0
        };
    },
    computed: {
        // ...mapState({
        //     List: state => {
        //         return state.articleList;
        //     }
        // }),
        // currentContent() {
        //     return this.List.slice(
        //         (this.currentPage - 1) * this.pageCount,
        //         this.currentPage * this.pageCount
        //     );
        // }
    },
    methods: {
        // ...mapActions({
        //     loadMoreArticles: 'COMMON_GET_ARTICLES'
        // }),
        async getArchieveListByPage() {
            await Axios.post(`${baseURL}/common/archieveAcquire`, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `获取文章列表失败：参数错误`
                        );
                    }
                    this.archieveList = res.data.resultList;
                    this.archieveListLength = res.data.totalCount;
                })
                .catch(() => {
                    return this.$message.error(`获取文章列表失败：服务器错误`);
                });
        },
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getArchieveListByPage();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getArchieveListByPage();
        }
    },
    watch: {},
    mounted() {
        this.getArchieveListByPage();
    },
    components: {
        SearchBar
    }
};
</script>

<style lang="scss" scoped></style>
