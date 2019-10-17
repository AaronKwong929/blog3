<template>
    <div id="type" class="router-view-general">
        <i class="iconfont icon-yingyongAPP root-icon"></i>
        <div class="router-title">
            分类
        </div>
        <SearchBar></SearchBar>
        <div class="list">
            <button
                :class="{ active: currentType === 'code' }"
                @click="changeType('code')"
            >
                编程({{ this.list.code.length }})
            </button>
            <button
                :class="{ active: currentType === 'game' }"
                @click="changeType('game')"
            >
                游戏({{ this.list.game.length }})
            </button>
            <button
                :class="{ active: currentType === 'life' }"
                @click="changeType('life')"
            >
                生活({{ this.list.life.length }})
            </button>
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
const SearchBar = () => import('../components/SearchBar');
import { mapActions } from "vuex";
export default {
    data() {
        return {
            list: {
                code: this.$store.state.articleList.filter(item => {
                    return item.type === "code";
                }),
                game: this.$store.state.articleList.filter(item => {
                    return item.type === "game";
                }),
                life: this.$store.state.articleList.filter(item => {
                    return item.type === "life";
                })
            },
            currentType: "code",
            page: 1
        };
    },
    computed: {
        articles() {
            return this.list[this.currentType];
        },
        currentPage() {
            if (this.page > 0 && this.page <= this.pageCount) {
                return this.articles.slice(
                    (this.page - 1) * 9,
                    this.page * 9 - 1
                );
            }
            return this.articles.slice(0, 9);
        },
        pageCount() {
            return Math.ceil(this.articles.length / 8);
        }
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        }),
        changeType(type) {
            this.currentType = type;
        },
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
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    },
    components: {
        SearchBar
    }
};
</script>
