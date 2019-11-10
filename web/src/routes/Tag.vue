<template>
    <div id="tag" class="router-view-general" v-if="this.$store.state.articleList.length">
        <i class="iconfont icon-biaoqian root-icon"></i>
        <div class="router-title">
            标签
        </div>
        <SearchBar></SearchBar>
        <div class="list">
            <button
                v-for="(item, index) in buttonList"
                :key="index"
                :class="{ active: currentTag === item.name }"
                @click="changeTag(item.name)"
                v-show="index<showNum"
            >
                {{ item.desc }}-{{ item.count }}
            </button>
            <button @click="showMore">{{ showOption }}</button>
            <router-link
                v-for="(item, index) in articles"
                :key="'link' + index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <time>{{ item.updatedAt }}</time>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
        <!-- <div class="pagination" v-show="this.pageCount > 1">
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
const SearchBar = () => import('../components/SearchBar');
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
            currentTag: '',
            page: 1,
            showAll: false,
            showNum: 3,
            showOption: '显示全部'
        };
    },
    computed: {
        articles() {
            return this.list[this.currentTag];
        },
        // currentPage() {
        //     if (this.page > 0 && this.page <= this.pageCount) {
        //         return this.articles.slice(
        //             (this.page - 1) * 8,
        //             this.page * 8 - 1
        //         );
        //     }
        //     return this.articles.slice(0, 8);
        // },
        // pageCount() {
        //     return Math.ceil(this.articles.length / 8);
        // },
        buttonList() {
            return [
                {
                    desc: "算法",
                    name: "algo",
                    count: this.list.algo.length
                },
                {
                    desc: "HTML",
                    name: "html",
                    count: this.list.html.length
                },
                {
                    desc: "JavaScript",
                    name: "js",
                    count: this.list.js.length
                },
                {
                    desc: "CSS",
                    name: "css",
                    count: this.list.css.length
                },
                {
                    desc: "Vue",
                    name: "vue",
                    count: this.list.vue.length
                },
                {
                    desc: "Node",
                    name: "node",
                    count: this.list.node.length
                },
                {
                    desc: "服务器",
                    name: "server",
                    count: this.list.server.length
                }
            ].sort((a, b) => {
                return b.count - a.count;
            });
        }
    },
    methods: {
        changeTag(tag) {
            this.currentTag = tag;
        },
        // prev() {
        //     if (this.page > 1) {
        //         this.page--;
        //     } else {
        //         this.page = 1;
        //     }
        // },
        // next() {
        //     if (this.page < this.pageCount) {
        //         this.page++;
        //     } else {
        //         this.page = this.pageCount;
        //     }
        // },
        init() {
            this.currentTag = this.buttonList[0].name;
        },
        showMore() {
            this.showAll = !this.showAll;
            this.showNum = this.showAll ? this.buttonList.length : 3;
            this.showOption = this.showAll ? '收起' : '显示全部';
        }
    },
    mounted() {
        this.init();
    },
    components: {
        SearchBar
    }
};
</script>
