<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-RectangleCopy13"></i>
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
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
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
</style>
