<template>
    <div id="app">
        <Sidebar></Sidebar>
        <div class="router-views">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>
const Sidebar = () => import("./components/Sidebar");
import { mapActions } from "vuex";
export default {
    components: {
        Sidebar
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        })
    },
    created() {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            this.$store.state.token = token;
        }
        if (!this.$store.state.articleList.length) {
            this.getArticles();
        }
    }
};
</script>

<style lang="scss" scoped>
.router-views {
    margin-left: 15%;
}
</style>
