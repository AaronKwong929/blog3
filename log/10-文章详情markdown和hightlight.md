# 文章详情页的样式 2019/8/12

> 详细 demo 请看 [vue-markdown-highlight](https://github.com/AaronKwong929/vue.js-demos/tree/master/vue-markdown-highlight)

## [vue 官网的 markdown](https://cn.vuejs.org/v2/examples/index.html)

在 demo 的基础上修改了小部分东西适应 blog3

```html
<div id="draft">
    <div class="write clearfix">
        <div class="left">
            <input
                type="text"
                v-model="title"
                placeholder="标题"
                class="title left"
            />
        </div>
        <div class="right">
            <input type="text" v-model="tag" placeholder="标签" class="tag" />
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
```

```javascript
import lodash from 'lodash';
import marked from 'marked';
export default {
    data() {
        return {
            title: '',
            tag: '',
            type: '',
            content: '',
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
            const details = this.$store.state.articleList.find(item => {
                return item._id === this.$route.params.id;
            });
            // console.log(details);
            this.$store.state.articleDetails = details;
            this.title = details.title;
            this.type = details.type;
            this.tag = details.tag;
            this.content = details.tag;
        },
        save: lodash.debounce(function() {
            this.$store.state.articleDetails.title = this.title;
            this.$store.state.articleDetails.tag = this.tag;
            this.$store.state.articleDetails.type = this.type;
            this.$store.state.articleDetails.content = this.content;
            // console.log(this.$store.state.articleDetails);
            this.$store.dispatch('SAVE_ARTICLE');
        }, 2000)
    },
    updated() {
        this.now = new Date().toLocaleString();
    },
    mounted() {
        this.$store.dispatch('GET_ARTICLES');
        this.getDetails();
    }
};
```

显示的时间放在 updated 里，实现实时时间变化，加防抖函数在 save 上，防止。。。？

articleDetails 也要初始化

this.\$store.state.articleDetails = details;

不然保存的时候与后端交互会出问题无法保存（\_id 的问题）
