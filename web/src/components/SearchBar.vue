<template>
    <div class="tool-bar">
        <el-input
            class="tool-bar-item"
            type="text"
            v-model="keyword"
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
export default {
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        search(type) {
            if (!this.keyword) {
                return this.$message.warning(`请先输入搜索内容`);
            }
            return this.$router.push({
                name: 'searchResult',
                params: {
                    type,
                    keyword: this.keyword
                }
            });
        }
    }
};
</script>
