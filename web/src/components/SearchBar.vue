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
            @click="search"
            type="primary"
            size="small"
            >搜索</el-button
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
        async search() {
            if (!this.keywords) {
                return this.$message.warning(``);
            }
            await Axios.post(`${baseURL}/common/searchKeywords`, {
                keyword: this.keyword
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
                    this.$message(`查询失败：服务器错误`);
                });
        }
    }
};
</script>
