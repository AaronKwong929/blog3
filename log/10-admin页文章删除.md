# 文章删除按钮的写法 2019/8/14

```html
<!--/web/src/routes/Admin.vue-->
<button @click="deleteArticle(item._id)">删除</button>
```

```javascript
// /web/src/routes/Admin.vue
deleteArticle(id) {
            this.$axios
                .post("/api/admin/delete", {
                    id
                })
                .then(() => {
                    this.getArticles();
                });
        }

// /server/routers/admin.js
adminRouter.post('/delete', verifyToken, async ctx => {
    const id = ctx.request.body.id;
    // console.log(id);
    await Article.findByIdAndDelete(id);
    ctx.response.body = {
        msg: 'success'
    }
});
```
