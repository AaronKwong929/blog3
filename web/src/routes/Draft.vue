<template>
    <div id="draft" class="clearfix">
        <div class="write clearfix">
            <div class="left">
                <input
                    type="text"
                    v-model="title"
                    placeholder="标题"
                    class="title left"
                    v-focus
                />
            </div>
            <div class="right">
                <select v-model="type">
                    <option disabled value="">分类</option>
                    <option value="code">编程</option>
                    <option value="game">游戏</option>
                    <option value="life">生活</option>
                </select>
                <select v-model="tag">
                    <option disabled value="">标签</option>
                    <option value="js">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="backend">后端</option>
                </select>
            </div>
            <button @click="saveNow" class="btn btn-small">
                <i class="iconfont icon-save"></i>
            </button>
            <!-- <button @click="back" class="btn btn-small">
                <i class="iconfont  icon-chexiaofanhuichehuishangyibu"></i>
            </button> -->
            <textarea v-model="content" id="editor" @input="save"></textarea>
        </div>
        <div class="read">
            <div class="article-title">{{ title }}</div>
            <div class="article-type article-info">
                <i class="iconfont icon-yingyongAPP"></i>{{ type }}
                <i class="iconfont icon-biaoqian"></i>{{ tag }}
            </div>
            <div class="article-time article-info">{{ now }}</div>
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
        saveNow: function() {
            this.$store.state.articleDetails.title = this.title;
            this.$store.state.articleDetails.tag = this.tag;
            this.$store.state.articleDetails.type = this.type;
            this.$store.state.articleDetails.content = this.content;
            // console.log(this.$store.state.articleDetails);
            this.$store.dispatch("SAVE_ARTICLE");
            this.$store.dispatch("COMMON_GET_ARTICLES");
        },
        // back() {
        //     this.$router.push("/admin");
        // }
    },
    updated() {
        this.now = new Date().toLocaleString();
    },
    mounted() {
        this.$store.dispatch("ADMIN_GET_ARTICLES");
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
    padding: 1.5rem 1.5rem 0 1.5rem;
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

#editor {
    height: 30rem;
    width: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    margin-top: 3rem;
    color: #333;
}

.write button {
    margin: 1rem 0.5rem 0 0;
}

.write .iconfont {
    font-size: 1.3rem;
}

input[type="text"] {
    border: none;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 1px solid #ddd; // 适应focus的蓝色边框
}

input[type="text"]:focus {
    border: 1px solid #03a9f4;
    box-shadow: 0 0 15px #03a9f4;
    text-shadow: none;
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

select {
    height:28px;  
    width:180px;  
    line-height:28px;  
    border-radius:2px;
    outline: none;
    margin-top: 1rem;
    margin-left: .5rem;
}
</style>