<template>
    <div id="home">
        <header>
            <Carousal></Carousal>
            <div class="recent">
                <span class="recent-title">最近动态</span>
                <div class="recent-content">
                    {{ Recent.content }}
                </div>
                <div class="recent-time">
                    {{ Recent.updatedAt }}
                </div>
            </div>
        </header>
        <div class="recent-articles">
            <span class="recent-title">最新文章</span>
            <router-link
                v-for="(item, index) in List"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <span class="title">{{ item.title }}</span>
                <span class="time">{{ item.updatedAt }}</span>
            </router-link>
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
    font-size: 0.8rem;
    margin: 5rem 1rem 0 18vw;
}
.recent-articles {
    box-shadow: 0 0 0.8rem 0 #aaa;
    padding: 1rem;
    margin: 3rem;
    border-radius: 1rem;
}
.list-item {
    cursor: pointer;
    width: 40vw;
    padding: 0.5rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.list-item:hover {
    box-shadow: 0 0 0.8rem 0 #aaa;
    border-radius: 1rem;
    transition: all 1s;
}
.list-item > .title {
    flex-grow: 1;
}
.list-item > .time {
    align-self: flex-end;
    justify-self: flex-end;
}
</style>
