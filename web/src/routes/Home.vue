<template>
    <div id="home">
        <div class="home-front">
            <div class="home-title">Aaron的个人博客</div>
            <div class="home-brief">--记录学习过程，分享学习心得</div>
        </div>
        <div class="home-article-list">
            <router-link
                v-for="(item, index) in List"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <div class="item-info clearfix">
                    <div class="title">{{ item.title }}</div>
                    <div class="tag">
                        <i class="iconfont icon-biaoqian"></i>{{ item.tag }}
                    </div>
                    <div class="type">
                        <i class="iconfont icon-yingyongAPP"></i>{{ item.type }}
                    </div>
                </div>
                <div class="short" v-html="compiledMarkdown(item.content)"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import marked from "marked";
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
        }),
        compiledMarkdown: function(content) {
            return marked(content);
        },
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    }
};
</script>

<style lang="scss" scoped>
.home-front {
    text-align: center;
    padding: 3rem 0 1rem 0;
    box-shadow: 0 0.6rem 0.6rem -0.6rem #aaa;
    color: rgb(96, 126, 121);
}

.home-title {
    font-size: 3rem;
}

.home-brief {
    font-size: 1.2rem;
    font-weight: 200;
}

.list-item {
    margin: 1rem;
    padding: 1rem;
    font-size: 1rem;
    box-shadow: 0 0 1rem -0.2rem #aaa;
    line-height: 1.3rem;
    cursor: pointer;
}

.list-item:hover {
    border-radius: 1rem;
    font-size: 1.1rem;
    box-shadow: 0 0 1rem 0.4rem #aaa;
    transition: all 0.3s;
    color: rgb(96, 126, 121);
}

.title {
    font-size: 1.4rem;
    font-weight: 600;
    float: left;
    color: rgb(96, 126, 121);
}

.type,
.tag {
    float: right;
    margin-left: .3rem;
    font-size: .8rem;
}

.short {
    margin-top: 1rem;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
}
</style>
