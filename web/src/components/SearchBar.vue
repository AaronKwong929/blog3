<template>
    <div id="search-bar">
        <input
            type="text"
            v-model="term"
            @keyup.enter="search"
            v-focus
            placeholder="搜索标题或内容"
        />
        <button class="btn-small" @click="search">搜索</button>
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
.btn-small {
    margin-left: 0.3rem;
    padding: 0.8rem;
}
</style>