<template>
    <article id="Article">
        <el-page-header @back="goBack" content="文章详情"> </el-page-header>
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
        <CommentArea :comments="Details.comments"></CommentArea>
    </article>
</template>
<script>
import marked from 'marked';
import { mapActions, mapState } from 'vuex';
import CommentArea from '../components/Comment';
export default {
    methods: {
        ...mapActions({
            getArticles: 'COMMON_GET_ARTICLES',
            getDetailss: 'FIND_ARTICLE'
        }),
        changeTo(name) {
            this.to = name;
        },
        goBack() {
            this.$router.go(-1);
        }
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
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
            // 不加一秒会显示不出来
            setTimeout(() => {
                this.getDetailss(this.$route.params.id);
            }, 1000);
        } else {
            this.getDetailss(this.$route.params.id);
        }
    },
    components: {
        CommentArea
    }
};
</script>
<style lang="scss" scoped>
#Article {
    margin: 2rem;
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
.article-content {
    overflow: hidden;
    padding-bottom: 1rem;
}
</style>
