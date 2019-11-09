# article.vue

取数据时候如果直接对

```javascript
computed: {
        compiledMarkdown: function() {
            return marked(this.details.content);
        }
    },
```

会在 console 报错，说 marked 的内容为 undefined，因为 mounted 的时候 computed 到 this.details.content 为空，会报错

## 解决方案 1

现参考 draft.vue 的渲染方法，单独将 content 取入 data()中

```javascript
data() {
        return {
            details: "",
            content: ""
        };
```

```javascript
computed: {
        compiledMarkdown: function() {
            return marked(this.content);
        }
    }
```

```html
<div class="article-content" v-highlight v-html="compiledMarkdown"></div>
```

## 解决方法2 （已采用）

将mounted()改成beforeMount()即可解决

```javascript
beforeMount() {
        this.getDetails();
    },
```
