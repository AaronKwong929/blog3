<template>
    <div class="tool-bar">
        <el-input
            class="tool-bar-item"
            type="text"
            v-model="term"
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
export default {
    data() {
        return {
            term: ''
        };
    },
    methods: {
        search() {
            this.$store.state.searchTerm = this.term;
            this.$store.commit('SEARCH_ARTICLES');
        }
    }
};
</script>
