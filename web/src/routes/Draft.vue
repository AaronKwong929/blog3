<template>
    <div id="draft" class="clearfix">
        <div class="write clearfix">
            <div class="left">
                <input
                    type="text"
                    v-model="title"
                    placeholder="标题"
                    class="title left"
                    @input="save"
                />
            </div>
            <div class="right">
                <select v-model="type" @input="save">
                    <option disabled value="">分类</option>
                    <option value="code">编程</option>
                    <option value="game">游戏</option>
                    <option value="life">生活</option>
                </select>
                <select v-model="tag" @input="save">
                    <option disabled value="">标签</option>
                    <option value="js">JavaScript</option>
                    <option value="vue">Vue</option>
                    <option value="node">Node</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="algo">算法</option>
                    <option value="server">服务器</option>
                </select>
            </div>
            <textarea v-model="content" v-focus @input="save"></textarea>
        </div>
        <div class="read">
            <div class="article-title">{{ title }}</div>
            <div class="article-type article-info">
                <i class="iconfont icon-yingyongAPP"></i>{{ type }}
                <i class="iconfont icon-biaoqian"></i>{{ tag }}
            </div>
            <time class="article-time article-info">{{ now }}</time>
            <div
                v-html="compiledMarkdown"
                v-highlight
                class="article-content"
            ></div>
        </div>
        <div class="comment-area" v-if="this.comments">
            <div
                v-for="(item, index) in this.comments"
                :key="index"
                class="comment clearfix"
            >
                <span class="comment-user">{{ item.from }} </span>
                <span class="comment-time">
                    {{ item.time }}
                </span>
                <div v-if="item.to">回复：@{{ item.to }}</div>
                <div class="comment-details">
                    {{ item.content }}
                </div>
                <button class="btn-small" @click="deleteComment(item._id)">
                    删除
                </button>
            </div>
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
            comments: "",
            now: this.$dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
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
            this.comments = details.comments;
        },
        save: lodash.debounce(function() {
            this.$store.state.articleDetails.title = this.title;
            this.$store.state.articleDetails.tag = this.tag;
            this.$store.state.articleDetails.type = this.type;
            this.$store.state.articleDetails.content = this.content;
            this.$store.dispatch("SAVE_ARTICLE");
            this.$store.dispatch("COMMON_GET_ARTICLES");
        }, 1000),
        deleteComment(id) {
            this.$store.dispatch("DELETE_COMMENT", {
                articleID: this.$route.params.id,
                commentID: id
            });
            setTimeout(() => {
                this.getDetails();
            }, 500);
        }
    },
    updated() {
        this.now = this.$dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
    },
    mounted() {
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
    vertical-align: top;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
}

.write input {
    display: block;
}

.write {
    width: 45%;
}

.read {
    width: 45%;
    border-radius: 1rem;
    box-shadow: 0 0 0.6rem 0.6rem #aaa;
    margin-top: 1.5rem;
    margin-left: 2.5rem;
}

.write button {
    margin: 1rem 0.5rem 0 0;
}

.write .iconfont {
    font-size: 1.3rem;
}

input {
    border: none;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 1px solid #ddd;
}

input:focus {
    border: 1px solid rgb(96, 126, 121);
    box-shadow: 0 0 15px rgb(96, 126, 121);
    text-shadow: none;
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

select {
    height: 2.5rem;
    width: 10rem;
    line-height: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-left: 0.5rem;
    padding: 0.5rem;
    outline: none;
    border: 1px solid #ddd;
}

select:focus {
    border: 1px solid rgb(96, 126, 121);
    box-shadow: 0 0 15px rgb(96, 126, 121);
    text-shadow: none;
}

textarea {
    margin-left: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    height: 35rem;
    width: 100%;
    margin-top: 3rem;
    color: #333;
    line-height: 1.2rem;
}

textarea:focus {
    border: 1px solid rgb(96, 126, 121);
    box-shadow: 0 0 15px rgb(96, 126, 121);
    text-shadow: none;
}

.comment .btn-small {
    padding: 0.4rem;
    display: inline-block;
}
</style>