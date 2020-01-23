<template>
    <div
        v-loading.fullscreen.lock="fullScreenLoading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
    >
        <el-page-header @back="goBack" content="文章详情"> </el-page-header>
        {{ articleDetails }}
    </div>
</template>

<script>
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
export default {
    data() {
        return {
            fullScreenLoading: false,
            articleDetails: {}
        };
    },
    methods: {
        goBack() {
            return this.$router.go(-1);
        },
        async getArticleDetails() {
            this.fullScreenLoading = true;
            await Axios.post(`${baseURL}/common/getArticleDetails`, {
                id: this.$route.params.id
            })
                .then(res => {
                    this.fullScreenLoading = false;
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `获取文章详情失败：${res.data.data}`
                        );
                    }
                    this.$set(this, 'articleDetails', res.data.article)
                })
                .catch(() => {
                    this.fullScreenLoading = false;
                    this.$message.error(`获取文章详情失败：服务器错误`);
                });
        }
    },
    mounted() {
        this.getArticleDetails();
    }
};
</script>

<style lang="scss" scoped></style>
