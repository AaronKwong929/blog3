<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            归档
        </div>
        <searchBar></searchBar>
        <div class="list">
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
        <div class="pagination">
            <input v-model="page" type="text" class="page-input" />
            共<span>{{ this.pageCount }}</span>页
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import searchBar from "../components/SearchBar";
export default {
    data() {
        return {
            page: 1
        };
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        }),
        currentPage() {
            if (this.page > 0 && this.page <= this.pageCount) {
                return this.List.slice(
                    (this.page - 1) * 10,
                    this.page * 10 - 1
                );
            }
            return this.List.slice(0, 9);
        },
        pageCount() {
            return Math.ceil(this.List.length / 9);
        }
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        })
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    },
    components: {
        searchBar
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    text-align: center;
    margin-top: 2rem;
}

.page-input {
    width: 8%;
    padding: .3rem .6rem;
}

.pagination > span::before,
.pagination > span::after {
    content: "  ";
    font-size: 1.3rem;
    font-weight: 800;
}
</style>
