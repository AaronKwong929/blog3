<template>
    <div id="search-bar">
        <input type="text" v-model="term" @keyup.enter="search" v-focus placeholder="搜索标题或内容"/>
        <button class="btn-small" @click="search">搜索</button>
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
input {
    border: none;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    color: rgb(96, 126, 121);
}

input:focus {
    border: 1px solid rgb(96, 126, 121);
    box-shadow: 0 0 15px rgb(96, 126, 121);
    text-shadow: none;
}
.btn-small {
    margin-left: .3rem;
    padding: .8rem
}
</style>