<template>
    <div id="admin">
        {{ List }}
        <hr />
        <button @click="logout">注销</button>
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
        // logout() {
        //     return this.$store.commit('LOG_OUT');
        // }
        ...mapActions({
            get_articles: 'GET_ARTICLES'
        })
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
    mounted() {
        // this.$store.dispatch("GET_ARTICLES");
        this.get_articles();
    }
};
</script>

<style lang="scss" scoped>
</style>
