<template>
    <div id="classify" class="router-view-general">
        <i class="iconfont icon-yingyongAPP"></i>
        <div class="router-title">
            文章分类
        </div>
        <div class="list">
            <button
                :class="{ active: currentType === 'code' }"
                @click="changeType('code')"
            >
                编程
            </button>
            <button
                :class="{ active: currentType === 'game' }"
                @click="changeType('game')"
            >
                游戏
            </button>
            <router-link
                v-for="(item, index) in articles"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
            >
                <span class="time">{{ item.updatedAt }}</span
                >&nbsp;
                <span class="title">{{ item.title }}</span>
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
                code: this.$store.state.articleList.filter(item => {
                    return item.type === "code";
                }),
                game: this.$store.state.articleList.filter(item => {
                    return item.type === "game";
                })
            },
            currentType: "code"
        };
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList.filter(item => {
                    return item.published === true;
                });
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
    }
};
</script>


<style lang="scss" scoped>
#classify > .iconfont {
    font-size: 3rem;
    position: absolute;
    top: -2rem;
    left: -1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    text-decoration: none;
    padding: 0 10px;
    font-size: 0.7em;
    color: #4eb5e5;
    border-style: none;
    background-color: lightcoral;
    cursor: pointer;
    outline: none;
}

button[class="active"] {
    color: black;
}

.list > div {
    cursor: pointer;
}
</style>
