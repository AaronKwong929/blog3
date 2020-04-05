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
        initDraft() {
            this.fullScreenLoading = true;
            const id = this.$route.params.id;
            this.$axios
                .getFetch(`${this.$api.getDraft}${id}`)
                .then(res => {
                    this.title = res.article.title;
                    this.type = resizeTo.article.type;
                    this.tag = res.article.tag;
                    this.updatedAt = res.article.updatedAt;
                    this.id = res.article._id;
                    this.content = res.article.content
                        ? res.article.content
                        : `请输入内容`;
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        saveDraft() {
            this.fullScreenLoading = true;
            this.$axios
                .putFetch(this.$api.updateDraft, {
                    article: {
                        _id: this.id,
                        title: this.title,
                        type: this.type,
                        tag: this.tag,
                        content: this.content
                    }
                })
                .then(() => {
                    this.$message.success(`已保存草稿`);
                })
                .finally(() => {
                    this.fullScreenLoading = false;
                });
        },
        /* 重置文章 */
        resetDraft() {
            this.title = '';
            this.tag = '';
            this.type = '';
            this.content = '请输入内容';
        },
        /* 20秒自动保存 */
        autoSaveDraft: lodash.debounce(function() {
            this.saveDraft();
        }, 20000),
        goBack() {
            this.saveDraft();
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
