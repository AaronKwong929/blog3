<template>
    <div id="search-bar">
        <el-input
            type="text"
            v-model="term"
            @keyup.enter="search"
            v-focus
            clearable
            placeholder="输入标题或内容"
        />
        <el-button @click="search" type="primary">搜索</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            term: ""
        };
    },
    methods: {
        search() {
            this.$store.state.searchTerm = this.term;
            this.$store.commit("SEARCH_ARTICLES");
        }
    }
};
</script>
<style lang="scss" scoped>
#search-bar {
    display: flex;
    /deep/ .el-input,
    /deep/ .el-button {
        margin-right: 1rem;
    }
}
</style>