# 归档页会主动数据更新是因为直接使用 state.articleList 来渲染

articleList 加载更多直接更新内容触发

tag 和 type 是根据当前 state.articleList 进行过滤取出数据，articleList 更新后不会主动触发重新过滤

增加 watch 监控 state.articleList 的长度，有变化时再进行数据过滤

## 虽然代码冗余量稍增但是是目前想到的唯一解决办法

```js
// tag.vue
watch: {
        stateArticleListLength: function() {
            this.list.algo = this.$store.state.articleList.filter(item => {
                return item.tag.includes("algo");
            });
            this.list.html = this.$store.state.articleList.filter(item => {
                return item.tag.includes("html");
            });
            this.list.css = this.$store.state.articleList.filter(item => {
                return item.tag.includes("css");
            });
            this.list.js = this.$store.state.articleList.filter(item => {
                return item.tag.includes("js");
            });
            this.list.node = this.$store.state.articleList.filter(item => {
                return item.tag.includes("node");
            });
            this.list.vue = this.$store.state.articleList.filter(item => {
                return item.tag.includes("vue");
            });
            this.list.server = this.$store.state.articleList.filter(item => {
                return item.tag.includes("server");
            });
        }

        
computed: {
        stateArticleListLength() {
            return this.$store.state.articleList.length;
        }
        }
```
