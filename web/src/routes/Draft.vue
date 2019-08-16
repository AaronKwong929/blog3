<template>
    <div id="draft" class="clearfix">
        <div class="write clearfix">
            <button @click="back">返回</button>
            <div class="left">
                <input
                    type="text"
                    v-model="title"
                    placeholder="标题"
                    class="title left"
                />
            </div>
            <div class="right">
                <input
                    type="text"
                    v-model="tag"
                    placeholder="标签"
                    class="tag"
                />
                <input
                    type="text"
                    v-model="type"
                    placeholer="分类"
                    class="classify"
                />
            </div>
            <textarea v-model="content" id="editor" @input="save"></textarea>
        </div>
        <div class="read">
            <div class="article-title">{{ title }}</div>
            <div class="article-type">{{ type }}</div>
            <div class="article-tag">{{ tag }}</div>
            <div class="article-time">{{ now }}</div>
            <div v-html="compiledMarkdown" v-highlight></div>
        </div>
    </div>
</template>
<script>
import lodash from "lodash";
import marked from "marked";
export default {
    data() {
        return {
            title: "",
            tag: "",
            type: "",
            content: "",
            now: new Date().toLocaleString()
        };
    },
    computed: {
        compiledMarkdown: function() {
            return marked(this.content);
        }
    },
    methods: {
        getDetails() {
            const details = this.$store.state.adminArticleList.find(item => {
                return item._id === this.$route.params.id;
            });
            this.$store.state.articleDetails = details;
            this.title = details.title;
            this.type = details.type;
            this.tag = details.tag;
            this.content = details.content;
        },
        save: lodash.debounce(function() {
            this.$store.state.articleDetails.title = this.title;
            this.$store.state.articleDetails.tag = this.tag;
            this.$store.state.articleDetails.type = this.type;
            this.$store.state.articleDetails.content = this.content;
            // console.log(this.$store.state.articleDetails);
            this.$store.dispatch("SAVE_ARTICLE");
            this.$store.dispatch("COMMON_GET_ARTICLES");
        }, 2000),
        back() {
            this.$router.push('/admin');
        }
    },
    updated() {
        this.now = new Date().toLocaleString();
    },
    mounted() {
        this.$store.dispatch('ADMIN_GET_ARTICLES');
        this.getDetails();
    }
};
</script>
<style lang="scss" scoped>
#draft {
    vertical-align: top;
}

#draft > div {
    display: inline-block;
    width: 50%;
    vertical-align: top;
    padding: 3rem 3rem 0 3rem;
}

.write input {
    display: block;
}

.write .left {
    float: left;
}

.write .right {
    float: right;
}

.read {
    width: 50%;
}

#editor {
    height: 20rem;
    width: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    margin-top: 3rem;
    color: #333;
}
</style>