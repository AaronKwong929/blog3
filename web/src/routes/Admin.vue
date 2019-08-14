<template>
    <div id="admin">
        <button @click="logout" class="btn btn-small">注销</button>
        <button @click="newArticle" class="btn btn-small">新建</button>
        <div class="list">
            <div
                :to="'/draft/' + item._id"
                v-for="(item, index) in List"
                :key="index"
            >
                <span class="title">{{ item.title }}</span>
                <span class="type">{{ item.type }}</span>
                <span class="tag">{{ item.tag }}</span>
                <span class="time">{{ item.updatedAt }}</span>
                <router-link :to="'/draft/' + item._id">+</router-link>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations({
            logout: "LOG_OUT"
        }),
        ...mapActions({
            getArticles: "GET_ARTICLES"
        }),
        newArticle() {
            this.$axios.post("/api/admin/draft").then(res => {
                // console.log(res.data.article);
                // 刷新state.articleList
                this.getArticles();
                // this.$store.state.articleDetails = res.data.article;
                setTimeout(() => {
                    this.$router.push(`/draft/${res.data.article._id}`);
                }, 300);

                // this.$router.push(
                //     `/draft/${res.data.article._id}`
                // );
            });
        }
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
    mounted() {
        this.getArticles();
    }
};
</script>

<style lang="scss" scoped>
</style>
