<template>
    <div id="search-result">
        <input type="text"/><br />
        {{ this.$store.state.searchTerm }}<br />
        <!-- 
        {{ this.$store.state.searchResults }}<br /> -->
        <div>
            <button
                :class="{ active: currentType === 'title' }"
                @click="changeType('title')"
            >
                标题搜索
                <!-- ({{ this.list.title.length }}) -->
            </button>
            <button
                :class="{ active: currentType === 'content' }"
                @click="changeType('content')"
            >
                全文搜索
                <!-- ({{ this.list.content.length }}) -->
            </button>
            <router-link
                v-for="(item, index) in articleLists"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <time class="time">{{ item.updatedAt }}</time>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            list: {
                title: this.$store.state.searchResults.titleResults,
                content: this.$store.state.searchResults.contentResults
            },
            currentType: "title"
        };
    },
    computed: {
        ...mapState({
            // titleList: state => {
            //     return state.searchTitleResults;
            // },
            // contentList: state => {
            //     return state.searchContentResults;
            // },
            searchTerm: state => {
                return state.searchTerm;
            }
        }),
        articleLists() {
            return this.list[this.currentType];
        }
    },
    methods: {
        // ...mapMutations({
        //     search: "SEARCH_ARTICLES"
        // }),
        changeType(type) {
            this.currentType = type;
        }
    },
    beforeMount() {
        // this.search();
    }
};
</script>

<style lang="scss" scoped>
</style>