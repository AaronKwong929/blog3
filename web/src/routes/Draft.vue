<template>
    <div id="draft" class="clearfix">
        <div v-if="articleDetails._id">
            {{ articleDetails }}
        </div>
        <el-button @click="saveDraft">
            保存
        </el-button>
        <!-- <div class="write clearfix">
            <div class="write-info">
                <input
                    type="text"
                    v-model="title"
                    placeholder="标题"
                    class="title left"
                    @input="save"
                />
                <input type="text" v-model="tag" placeholder="标签" />
                <select v-model="type">
                    <option disabled value="">分类</option>
                    <option value="code">编程</option>
                    <option value="game">游戏</option>
                    <option value="life">生活</option>
                </select>
                <label for="updateImg">此处本应有图片</label>
                <input
                    name="file"
                    type="file"
                    accept="image/png,image/gif,image/jpeg"
                    id="updateImg"
                    @change="update"
                    hidden
                />
                <ul class="imgurl-box" v-if="this.imgUrls.length">
                    <li
                        class="imgurl"
                        v-for="(item, index) in this.imgUrls"
                        :key="index"
                    >
                        {{ index }} - {{ item }}
                    </li>
                </ul>
            </div>
            <div class="button_bar">
                <span @click="addBold"><B>B</B></span>
                <span @click="addUnderline"><B>U</B></span>
                <span @click="addItalic"><B>I</B></span>
                <span @click="addH(1)"><B>H1</B></span>
                <span @click="addH(2)"><B>H2</B></span>
                <span @click="addH(3)"><B>H3</B></span>
                <span @click="addH(4)"><B>H4</B></span>
                <span @click="addH(5)"><B>H5</B></span>
                <span @click="addH(6)"><B>H6</B></span>
            </div>
            <textarea
                v-model="content"
                v-focus
                @input="save"
                ref="md_area"
            ></textarea>
        </div>
        <div class="read">
            <div class="article-title">{{ title }}</div>
            <div class="article-type article-info">
                <i class="iconfont icon-yingyongAPP"></i>{{ type }}
                <i class="iconfont icon-biaoqian"></i>{{ tag }}
            </div>
            <div class="article-time article-info">{{ now }}</div>
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
        </div> -->
    </div>
</template>
<script>
// import lodash from 'lodash';
// import marked from 'marked';
// import { mapActions, mapState } from 'vuex';
import Axios from '../axios';
const baseUrl = process.env.VUE_APP_API;
export default {
    data() {
        return {
            fullScreenLoading: false,
            articleDetails: {
                title: ``,
                type: ``,
                tag: ``,
                content: ``,
                published: ``,
                updatedAt: ``,
                _id: ``
            }
            // title: '',
            // tag: '',
            // type: '',
            // content: '',
            // comments: '',
            // now: this.$dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
        };
    },
    // computed: {
    //     compiledMarkdown: function() {
    //         return marked(this.content);
    //     },
    //     ...mapState(['imgUrls'])
    // },
    methods: {
        // getDetails() {
        //     const details = this.$store.state.adminArticleList.find(item => {
        //         return item._id === this.$route.params.id;
        //     });
        //     this.$store.state.articleDetails = details;
        //     this.title = details.title;
        //     this.type = details.type;
        //     this.tag = details.tag;
        //     this.content = details.content;
        //     this.comments = details.comments;
        // },
        // save: lodash.debounce(function() {
        //     this.$store.state.articleDetails.title = this.title;
        //     this.$store.state.articleDetails.tag = this.tag;
        //     this.$store.state.articleDetails.type = this.type;
        //     this.$store.state.articleDetails.content = this.content;
        //     this.$store.dispatch('SAVE_ARTICLE');
        //     this.$store.dispatch('COMMON_GET_ARTICLES');
        // }, 3000),
        // deleteComment(id) {
        //     this.$store.dispatch('DELETE_COMMENT', {
        //         articleID: this.$route.params.id,
        //         commentID: id
        //     });
        //     setTimeout(() => {
        //         this.getDetails();
        //     }, 1000);
        // },
        // addBold() {
        //     this.changeSelectedText('**', '**');
        // },
        // addItalic() {
        //     this.changeSelectedText('*', '*');
        // },
        // addUnderline() {
        //     this.changeSelectedText('<u>', '</u>');
        // },
        // addH(i) {
        //     let prefix = ``;
        //     for (let k = 0; k < i; k++) {
        //         prefix += `#`;
        //     }
        //     if (!this.content) {
        //         this.content = `${prefix} `;
        //     } else {
        //         this.content = this.content += `\n\n${prefix} `;
        //     }
        //     this.$refs.md_area.focus();
        // },
        // changeSelectedText(startString, endString) {
        //     let t = this.$refs.md_area;
        //     if (window.getSelection) {
        //         if (
        //             t.selectionStart != undefined &&
        //             t.selectionEnd != undefined
        //         ) {
        //             let str1 = t.value.substring(0, t.selectionStart);
        //             let str2 = t.value.substring(
        //                 t.selectionStart,
        //                 t.selectionEnd
        //             );
        //             let str3 = t.value.substring(t.selectionEnd);
        //             let result = str1 + startString + str2 + endString + str3;
        //             t.value = result;
        //             this.content = t.value;
        //         }
        //     }
        // },
        // update(e) {
        //     let event = {
        //         file: e.target.files[0]
        //     };
        //     // console.log(event);
        //     this.updateImg(event);
        // },
        // ...mapActions({
        //     updateImg: 'UPDATE_IMAGE'
        // }),
        /* 获取文章 */
        async initDraft() {
            const id = this.$route.params.id;
            await Axios.get(`${baseUrl}/admin/draft?id=${id}`)
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    Object.assign(this.articleDetails, res.data.article);
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        },
        /* 保存文章 */
        async saveDraft() {
            await Axios.put(`${baseUrl}/admin/draft`, {
                article: this.articleDetails
            })
                .then(res => {
                    if (res.status !== 0) {
                        return this.$message.error(
                            `保存失败：${res.data.message}`
                        );
                    }
                    this.$message.success(`已保存`);
                })
                .catch(() => {
                    this.$message.error(`保存失败：服务器错误`);
                });
        }
    },
    // updated() {
    //     this.now = this.$dateFormat(new Date(), 'yyyy-MM-dd hh:mm');
    // },
    mounted() {
        // this.getDetails();
        this.initDraft();
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
    box-shadow: 0 0 0.2rem 0.2rem #aaa;
    margin-top: 1.5rem;
    margin-left: 2.5rem;
}
.write button {
    margin: 1rem 0.5rem 0 0;
}
.write .iconfont {
    font-size: 1.3rem;
}
.write-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
input {
    margin: 0.5rem 0;
    width: 100%;
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
    width: 100%;
    line-height: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
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
    margin-top: 1rem;
    line-height: 1.2rem;
}
.comment .btn-small {
    padding: 0.4rem;
    display: inline-block;
}
.button_bar {
    margin-top: 1rem;
    background-color: #d4d4d4;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
}
div.button_bar span {
    margin-right: 1rem;
    line-height: 40px;
    text-align: center;
    color: rgb(96, 126, 121);
    cursor: pointer;
}

.imgurl-box {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid rgb(96, 126, 121);
    .imgurl {
        padding: 0.3rem;
    }
}
</style>
