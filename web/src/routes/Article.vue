<template>
    <div id="Article">
        <div class="article-title">
            {{ Details.title }}
        </div>
        <div class="article-time article-info">
            <i class="iconfont icon-riqi"></i>{{ Details.updatedAt }}
        </div>
        <div class="article-other article-info">
            <i class="iconfont icon-yingyongAPP"></i>{{ Details.type }}
            <i class="iconfont icon-biaoqian"></i>{{ Details.tag }}
        </div>
        <div
            class="article-content"
            v-highlight
            v-html="compiledMarkdown"
        ></div>
    </div>
</template>
<script>
import marked from "marked";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            details: ""
        };
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES",
            getDetailss: "FIND_ARTICLE"
        })
    },
    computed: {
        compiledMarkdown: function() {
            return marked(this.Details.content);
        },
        ...mapState({
            Details: state => {
                return state.articleDetails;
            }
        })
    },
    // 不写 beforeMount 在获取了 list 之后再打开文章详情会报错，写了不会，但在情页刷新还会，顺序问题，暂未解决
    beforeMount() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
            // 不加一秒会显示不出来 未知原因
            setTimeout(() => {
                this.getDetailss(this.$route.params.id);
            }, 1000);
        } else {
            this.getDetailss(this.$route.params.id);
        }
    }
};
</script>
<style lang="scss" scoped>
#Article {
    margin: 6rem;
    box-shadow: 0 0 0.8rem 0 #aaa;
    border-radius: 1rem;
    padding-top: 1rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
}

.article-title {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    box-shadow: 0 0.3rem 0.3rem -0.2rem #aaa;
    padding-bottom: 1rem;
}

.article-info {
    text-align: center;
    margin-top: 0.3rem;
}
</style>