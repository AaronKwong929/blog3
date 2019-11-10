<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            归档
        </div>
        <SearchBar></SearchBar>
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
        <div class="pagination" v-show="this.pageCount > 1">
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
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
const SearchBar = () => import('../components/SearchBar');
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
        prev() {
            if (this.page > 1) {
                this.page--;
            } else {
                this.page = 1;
            }
        },
        next() {
            if (this.page < this.pageCount) {
                this.page++;
            } else {
                this.page = this.pageCount;
            }
        }
    },
    components: {
        SearchBar
    }
};
</script>
