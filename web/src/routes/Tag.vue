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
                algo: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('algo');
                }),
                html: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('html');
                }),
                css: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('css');
                }),
                js: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('js')
                }),
                node: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('node');
                }),
                vue: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('vue');
                }),
                server: this.$store.state.articleList.filter(item => {
                    return item.tag.includes('server');
                })
            },
            currentTag: "algo",
            page: 1
        };
    },
    computed: {
        articles() {
            return this.list[this.currentTag];
        },
        currentPage() {
            if (this.page > 0 && this.page <= this.pageCount) {
                return this.articles.slice(
                    (this.page - 1) * 8,
                    this.page * 8 - 1
                );
            }
            return this.articles.slice(0, 8);
        },
        pageCount() {
            return Math.ceil(this.articles.length / 8);
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
