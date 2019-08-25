<template>
    <div id="home" class="router-view-general">
        <i class="iconfont icon-cangku"></i>
        <div class="router-title">Aaron的个人博客</div>
        <!-- <button @click="show">show</button> -->
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES",
        }),
        // show() {
        //     // console.log(this.$store.state.token);
        // }
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    }
};
</script>

<style lang="scss" scoped>
#home > .iconfont {
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
</style>
