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
                v-for="(item, index) in articles"
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
    </div>
</template>

<script>
import SearchBar from "../components/SearchBar"
import { mapState, mapActions } from "vuex";
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
            currentType: "code"
        };
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        }),
        articles() {
            return this.list[this.currentType];
        }
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        }),
        changeType(type) {
            this.currentType = type;
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
