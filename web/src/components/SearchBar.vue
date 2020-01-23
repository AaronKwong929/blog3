<template>
    <div class="tool-bar">
        <el-input
            class="tool-bar-item"
            type="text"
            v-model="keywords"
            @keyup.enter="search"
            v-focus
            clearable
            placeholder="输入标题或内容"
            size="small"
            style="width: 20vw;"
        />
        <el-button
            class="tool-bar-item"
            @click="search(1)"
            type="primary"
            size="small"
            >搜索标题</el-button
        >
        <el-button
            class="tool-bar-item"
            @click="search(2)"
            type="primary"
            size="small"
            >搜索内容</el-button
        >
    </div>
</template>
<script>
const baseURL = process.env.VUE_APP_API;
import Axios from '../axios';
export default {
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        async search(type) {
            if (!this.keywords) {
                return this.$message.warning(`请输入搜索内容`);
            }
            await Axios.post(`${baseURL}/common/search`, {
                keyword: this.keyword,
                type
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    this.$router.push({
                        path: 'results',
                        params: {
                            resultList: res.data.resultList
                        }
                    });
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        },
        async SearchContent() {
            if (!this.keywords) {
                return this.$message.warning(`请输入搜索内容`);
            }
            await Axios.post(`${baseURL}/common/searchContent`, {
                keyword: this.keyword,
                
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(
                            `查询失败：${res.data.message}`
                        );
                    }
                    this.$router.push({
                        path: 'results',
                        params: {
                            resultList: res.data.resultList
                        }
                    });
                })
                .catch(() => {
                    this.$message.error(`查询失败：服务器错误`);
                });
        }
    }
};
</script>
