<template>
    <div id="home">
        <header>
            <Carousal></Carousal>
            <div class="recent">
                <div class="recent-title">最近动态</div>
                <div class="recent-content">
                    {{ Recent.content }}
                </div>
                <div class="recent-time">
                    {{ Recent.updatedAt }}
                </div>
            </div>
        </header>
        <div class="resent resent-articles">
            <div
                class="resent-article-item"
                v-for="(item, index) in List"
                :key="index"
            >
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script>
const Carousal = () => import("../components/Carousal");
import { mapState, mapActions } from "vuex";
export default {
    components: {
        Carousal
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES",
            getRecent: "GET_RECENT"
        })
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList.slice(0, 3);
            },
            Recent: state => {
                return state.recent || "";
            }
        })
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
        if (this.$store.state.recent === "") {
            this.getRecent();
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    padding-top: 1rem;
    display: flex;
    height: 330px;
}
.recent {
    width: 30vw;
    box-shadow: 0 0 0.8rem 0 #aaa;
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
}
.recent-title {
    font-size: 2rem;
    border-bottom: 1px solid rgba(96, 126, 121, 0.4);
}
.recent-content {
    font-weight: 300;
    font-size: 1.5rem;
}
.recent-time {
    font-size: .8rem;
    margin: 5rem 1rem 0 18vw;
}
</style>
