<template>
    <div id="Article">
        <div class="article-title">
            {{ details.title }}
        </div>
        <div class="article-time article-info">
            <i class="iconfont icon-riqi"></i>{{ details.updatedAt }}
        </div>
        <div class="article-other article-info">
            <i class="iconfont icon-yingyongAPP"></i>{{ details.type }}
            <i class="iconfont icon-biaoqian"></i>{{ details.tag }}
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
export default {
    data() {
        return {
            details: ""
        };
    },
    methods: {
        getDetails() {
            this.details = this.$store.state.articleList.find(item => {
                return item._id === this.$route.params.id;
            });
        }
    },
    computed: {
        compiledMarkdown: function() {
            return marked(this.details.content, {
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
        }
    },
    mounted() {
        this.getDetails();
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
}

.article-info {
    text-align: center;
    margin-top: 0.3rem;
}
</style>