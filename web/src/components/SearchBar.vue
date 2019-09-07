<template>
    <div id="search-bar">
        <input type="text" v-model="term" required/>
        <button @click="search()">搜索</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            term: ""
        }
    },
    methods: {
        search() {
            this.$store.state.searchTerm = this.term;
            this.$store.commit("SEARCH_ARTICLES");
        }
    },
};
</script>

<style lang="scss" scoped>

</style>