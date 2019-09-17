<template>
    <div id="tag" class="router-view-general">
        <i class="iconfont icon-biaoqian root-icon"></i>
        <div class="router-title">
            标签
        </div>
        <SearchBar></SearchBar>
        <div class="list">
            <button
                :class="{ active: currentTag === 'algo' }"
                @click="changeTag('algo')"
            >
                算法({{ this.list.algo.length }})
            </button>
            <button
                :class="{ active: currentTag === 'html' }"
                @click="changeTag('html')"
            >
                HTML({{ this.list.html.length }})
            </button>
            <button
                :class="{ active: currentTag === 'js' }"
                @click="changeTag('js')"
            >
                JS({{ this.list.js.length }})
            </button>
            <button
                :class="{ active: currentTag === 'css' }"
                @click="changeTag('css')"
            >
                CSS({{ this.list.css.length }})
            </button>
            <button
                :class="{ active: currentTag === 'vue' }"
                @click="changeTag('vue')"
            >
                Vue({{ this.list.vue.length }})
            </button>
            <button
                :class="{ active: currentTag === 'node' }"
                @click="changeTag('node')"
            >
                Node({{ this.list.node.length }})
            </button>
            <button
                :class="{ active: currentTag === 'server' }"
                @click="changeTag('server')"
            >
                服务器({{ this.list.server.length }})
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
        <div class="pagination">
            <button @click="prev">←</button>
            第
            <input v-model="page" type="text" class="page-input" />
            <button @click="next">→</button>
            ， 共<span>{{ this.pageCount }}</span
            >页
        </div>
    </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            list: {
                algo: this.$store.state.articleList.filter(item => {
                    return item.tag === "algo";
                }),
                html: this.$store.state.articleList.filter(item => {
                    return item.tag === "html";
                }),
                css: this.$store.state.articleList.filter(item => {
                    return item.tag === "css";
                }),
                js: this.$store.state.articleList.filter(item => {
                    return item.tag === "js";
                }),
                node: this.$store.state.articleList.filter(item => {
                    return item.tag === "node";
                }),
                vue: this.$store.state.articleList.filter(item => {
                    return item.tag === "vue";
                }),
                server: this.$store.state.articleList.filter(item => {
                    return item.tag === "server";
                })
            },
            currentTag: "algo",
            page: 1
        };
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        }),
        articles() {
            return this.list[this.currentTag];
        },
        currentPage() {
            if (this.page > 0 && this.page <= this.pageCount) {
                return this.articles.slice(
                    (this.page - 1) * 10,
                    this.page * 10 - 1
                );
            }
            return this.articles.slice(0, 9);
        },
        pageCount() {
            return Math.ceil(this.articles.length / 9);
        }
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        }),
        changeTag(tag) {
            this.currentTag = tag;
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

<style lang="scss" scoped>
.pagination {
    text-align: center;
    margin-top: 2rem;
}

.page-input {
    width: 8%;
    padding: 0.3rem 0.6rem;
}

.pagination > span::before,
.pagination > span::after {
    content: "  ";
    font-size: 1.3rem;
    font-weight: 800;
}
</style>