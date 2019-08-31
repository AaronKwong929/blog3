<template>
    <div id="tag" class="router-view-general">
        <i class="iconfont icon-biaoqian root-icon"></i>
        <div class="router-title">
            标签
        </div>
        <div class="list">
            <button
                :class="{ active: currentTag === 'backend' }"
                @click="changeTag('backend')"
            >
                Backend({{ this.list.backend.length }})
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
                v-for="(item, index) in articles"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <div class="time">{{ item.updatedAt }}</div>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            list: {
                backend: this.$store.state.articleList.filter(item => {
                    return item.tag === "backend";
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
            currentTag: "backend"
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
        }
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        }),
        changeTag(tag) {
            this.currentTag = tag;
        }
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    }
};
</script>


<style lang="scss" scoped>
</style>
