<template>
    <div id="home" class="router-view-general">
        <i class="iconfont icon-home1"></i>
        <div class="router-title">Aaron的个人博客</div>
        <!-- <div class="article-list">
            <router-link
                class="article-item"
                :to="'/article/' + item._id"
                v-for="(item, index) in List"
                :key="index"
                tag="div"
            >
                <div class="item-head clearfix">
                    <div class="head-title">{{ item.title }}</div>
                    <div class="head-time">{{ item.updatedAt }}</div>
                </div>
                <div class="item-body">
                    <div class="body-type">{{ item.type }}</div>
                    <div class="body-tag">{{ item.tag }}</div>
                    <div class="body-content">
                        <p v-html="compiledMarkdown(item.content)"></p>
                    </div>
                </div>
            </router-link>
        </div> -->
    </div>
</template>

<script>
// import Marked from "marked";
import { mapActions } from "vuex";
// import { mapState } from "vuex";
export default {
    // computed: {
    //     ...mapState({
    //         List: state => {
    //             return state.articleList.filter(item => {
    //                 return item.published === true;
    //             });
    //         }
    //     })
    // },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        })
        // compiledMarkdown: function(data) {
        //     return Marked(data);
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

// .article-item {
//     box-shadow: 0 0 0.6rem #aaa;
//     border-radius: 1rem;
//     background-color: white;
//     margin: 1rem auto;
//     cursor: pointer;
// }

// .article-item:hover {
//     background-color: rgba(170, 170, 170, 0.4);
// }

// .item-head {
//     box-shadow: 0 0.5rem 0.5rem -0.5rem #aaa;
// }

// .head-title {
//     padding: 0.5rem 0 0.5rem 1rem;
//     float: left;
//     font-size: 2rem;
//     letter-spacing: 0.05rem;
// }

// .head-time {
//     padding: 1rem 1rem 0.5rem 0;
//     float: right;
//     font-size: 1.1rem;
// }

// .item-body {
//     padding: 0.5rem 0.5rem;
// }

// .body-type {
//     display: inline-block;
//     font-size: 0.9rem;
// }

// .body-tag {
//     display: inline-block;
//     font-size: 0.9rem;
// }

// .body-content {
//     // margin-top: 1rem;
//     // font-size: 1.2rem;
//     // overflow: hidden;
//     // text-overflow: ellipsis;
//     // letter-spacing: 0.1rem;
//     // line-height: 3.5rem;
//     // max-height: 6rem;
//     display: flex;
//     height: 4rem;
//     align-items: center;
// }
</style>
