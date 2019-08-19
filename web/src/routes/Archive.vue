<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            归档
        </div>
        <div class="list">
            <router-link
                v-for="(item, index) in List"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <div class="time">{{ item.updatedAt }}</div>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        })
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    }
};
</script>


<style lang="scss" scoped>
</style>
