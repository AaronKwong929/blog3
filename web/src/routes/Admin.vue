<template>
    <div id="admin">
        {{ List }}
        <hr />
        <button @click="logout" class="btn btn-small">注销</button>
        <button @click="newArticle">新建</button>
        <router-view></router-view>
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
            logout: 'LOG_OUT'
        }),
        ...mapActions({
            getArticles: 'GET_ARTICLES'
        }),
        newArticle() {
            this.$axios.post('/api/admin/draft').then(
                res => {
                    console.log(res.data.article);
                    this.$store.state.articleDetails = res.data.article;
                    this.$router.push(`/draft/${this.$store.state.articleDetails._id}`);
                }
            )
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
