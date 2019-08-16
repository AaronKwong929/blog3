<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            文章归档
        </div>
        <div class="list">
            <router-link
                v-for="(item, index) in List"
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
    computed: {
        ...mapState({
            List: state => {
                return state.articleList
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
#archive > .iconfont {
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

.list > div {
    cursor: pointer;
}
</style>
