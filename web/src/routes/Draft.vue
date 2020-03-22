<template>
    <div style="height: 100%; width: 100%;">
        <el-container>
            <el-main>
                <el-page-header
                    @back="goBack"
                    content="文章编辑"
                    title="返回管理"
                >
                </el-page-header>
                <el-row class="row">
                    <el-col :span="6">
                        <el-input
                            size="small"
                            placeholder="文章标题"
                            v-model="title"
                            @input="autoSaveDraft"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="12">
                        <el-select
                            size="small"
                            v-model="type"
                            clearable
                            placeholder="类型"
                            @change="autoSaveDraft"
                        >
                            <el-option
                                v-for="(item, index) in typeOptions"
                                :key="`type` + index"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="12">
                        <el-select
                            size="small"
                            v-model="tag"
                            clearable
                            placeholder="标签"
                            @change="autoSaveDraft"
                            ><el-option
                                v-for="(item, index) in tagOptions"
                                :key="`tag` + index"
                                :value="item.value"
                                :label="item.label"
                            ></el-option
                        ></el-select>
                    </el-col>
                </el-row>
                <vue-editor
                    v-model="content"
                    style="height: 65vh;"
                    @input="autoSaveDraft"
                ></vue-editor>
                <div class="footer-bar">
                    <el-button @click="resetDraft" size="small" type="info"
                        >重置</el-button
                    >
                    <el-button @click="saveDraft" size="small" type="primary"
                        >保存</el-button
                    >
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import lodash from 'lodash';
import Axios from '../axios';
const baseUrl = process.env.VUE_APP_API;
export default {
    data() {
        return {
            fullScreenLoading: false,
            title: ``,
            type: ``,
            tag: ``,
            published: ``,
            updatedAt: ``,
            id: ``,
            content: '',
            // 分类
            typeOptions: [
                { value: `code`, label: `编程` },
                { value: `game`, label: `游戏` },
                { value: `life`, label: `生活` }
            ],
            // 标签
            tagOptions: [
                { value: `html`, label: `HTML` },
                { value: `css`, label: `CSS` },
                { value: `js`, label: `JavaScript` },
                { value: `algo`, label: `算法` },
                { value: `vue`, label: `Vue.JS` },
                { value: `server`, label: `服务器` }
            ]
        };
    },
    methods: {
        /* 获取文章 */
        initDraft() {
            const id = this.$route.params.id;
            Axios.get(`${baseUrl}/admin/draft?id=${id}`)
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    this.title = res.data.article.title;
                    this.type = res.data.article.type;
                    this.tag = res.data.article.tag;
                    this.updatedAt = res.data.article.updatedAt;
                    this.id = res.data.article._id;
                    this.content = res.data.article.content
                        ? res.data.article.content
                        : `请输入内容`;
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        },
        /* 保存文章 */
        saveDraft() {
            Axios.put(`${baseUrl}/admin/draft`, {
                article: {
                    _id: this.id,
                    title: this.title,
                    type: this.type,
                    tag: this.tag,
                    content: this.content
                }
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `保存失败`
                        );
                    }
                    this.$message.success(`已保存草稿`);
                })
                .catch(() => {
                    this.$message.error(`保存失败：服务器错误`);
                });
        },
        /* 重置文章 */
        resetDraft() {
            this.title = '';
            this.tag = '';
            this.type = '';
            this.content = '请输入内容';
        },
        /* 自动保存 */
        autoSaveDraft: lodash.debounce(function() {
            this.saveDraft();
        }, 20000),
        /* 返回上级 */
        async goBack() {
            await this.saveDraft();
            this.$router.go(-1);
        }
    },
    mounted() {
        this.initDraft();
    }
};
</script>
<style lang="scss" scoped>
/deep/.vmd-body {
    height: 65vh;
    background: rgba($color: #00d090, $alpha: 0.3);
}
.footer-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 6vh;
}
.row {
    margin: 0.4rem 0;
}
</style>
