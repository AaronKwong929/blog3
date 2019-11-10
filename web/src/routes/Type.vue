<template>
    <div id="type" class="router-view-general" v-if="this.$store.state.articleList.length">
        <i class="iconfont icon-yingyongAPP root-icon"></i>
        <div class="router-title">
            分类
        </div>
        <SearchBar></SearchBar>
        <div class="list">
            <button
                v-for="(item, index) in buttonList"
                :key="index"
                :class="{ active: currentType === item.name }"
                @click="changeType(item.name)"
                v-show="index < showNum"
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
const SearchBar = () => import("../components/SearchBar");
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
            currentType: "",
            // page: 1,
            showAll: false,
            showNum: 1,
            showOption: "显示全部"
        };
    },
    computed: {
        articles() {
            return this.list[this.currentType];
        },
        // currentPage() {
        //     if (this.page > 0 && this.page <= this.pageCount) {
        //         return this.articles.slice(
        //             (this.page - 1) * 10,
        //             this.page * 10 - 1
        //         );
        //     }
        //     return this.articles.slice(0, 9);
        // },
        // pageCount() {
        //     return Math.ceil(this.articles.length / 9);
        // },
        buttonList() {
            return [
                {
                    desc: "编程",
                    name: "code",
                    count: this.list.code.length
                },
                {
                    desc: "生活",
                    name: "life",
                    count: this.list.life.length
                },
                {
                    desc: "游戏",
                    name: "game",
                    count: this.list.game.length
                }
            ].sort((a, b) => {
                return b.count - a.count;
            });
        }
    },
    methods: {
        changeType(type) {
            this.currentType = type;
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
            this.currentType = this.buttonList[0].name;
        },
        showMore() {
            this.showAll = !this.showAll;
            this.showNum = this.showAll ? this.buttonList.length : 1;
            this.showOption = this.showAll ? "收起" : "显示全部";
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
