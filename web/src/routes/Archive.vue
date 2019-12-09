<template>
    <div id="archive">
        <!--  class="router-view-general" -->
        <!-- <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            归档
        </div> -->
        <div class="tool-bar">
            <SearchBar></SearchBar>
            <el-button
                @click="loadMoreArticles"
                :disabled="
                    !(this.$store.state.currentPage <= this.$store.state.pageCount)
                "
            >
                加载更多
            </el-button>
        </div>
        <el-table
            :data="currentContent"
            height="70vh"
            :default-sort="{ prop: 'updatedAt', order: 'descending' }"
            stripe
            tooltip-effect="dark"
        >
            <!-- 
            style="width: 60%; margin: 0 auto" -->
            <!-- <el-table-column type="index" width="30"></el-table-column> -->
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
            :total="List.length"
            :current-page="1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <!-- <div class="list">
            
            <router-link
                v-for="(item, index) in currentPage"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <time>{{ item.updatedAt }}</time>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
        <div class="pagination" v-if="this.pageCount > 1">
            <button
                class="btn-small"
                @click="prev"
                :class="{ unselectable: page === 1 }"
            >
                ←
            </button>
            第
            <input v-model="page" type="text" class="page-input" />
            页
            <button
                class="btn-small"
                @click="next"
                :class="{ unselectable: page === pageCount }"
            >
                →
            </button>
            ， 共<span>{{ this.pageCount }}</span
            >页
        </div> -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
const SearchBar = () => import('../components/SearchBar');
export default {
    data() {
        return {
            currentPage: 1,
            pageCount: 10
        };
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        }),
        currentContent() {
            return this.List.slice(
                (this.currentPage - 1) * this.pageCount,
                this.currentPage * this.pageCount
            );
        }
    },
    methods: {
        ...mapActions({
            loadMoreArticles: 'COMMON_GET_ARTICLES'
        }),
        pushToArticle(id) {
            this.$router.push(`article/${id}`);
        },
        handleSizeChange(val) {
            this.pageCount = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    watch: {},
    components: {
        SearchBar
    }
};
</script>

<style lang="scss" scoped>

</style>
