<template>
    <div id="search-result" class="router-view-general">
        <i class="iconfont icon-sousuo1"></i>
        <div class="router-title">
            搜索结果
        </div>
        <div class="has-result" v-if="!this.$store.state.searchTerm">
            没有搜索内容
        </div>
        <div v-else>
            <div class="list">
                <button
                    :class="{ active: currentType === 'title' }"
                    @click="changeType('title')"
                >
                    标题搜索
                </button>
                <button
                    :class="{ active: currentType === 'content' }"
                    @click="changeType('content')"
                >
                    全文搜索
                </button>
                <div class="has-result">
                    搜索内容：{{ this.$store.state.searchTerm }}<br />
                    <span class="result-count">
                        共有<span class="result-number">{{
                            this.list[this.currentType].length
                        }}</span
                        >个搜索结果
                    </span>
                </div>
            </div>
            <router-link
                v-for="(item, index) in articleLists"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <time class="time">{{ item.updatedAt }}</time>
                <div class="line"></div>
                <div class="title" v-html="replaceHighlight(item.title)"></div>
                <div
                    class="content-short"
                    v-show="isContentSearch"
                    v-html="shorterDetails(item.content)"
                ></div>
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
            searchTerm: state => {
                return state.searchTerm;
            }
        }),
        articleLists() {
            return this.list[this.currentType];
        },
        isContentSearch() {
            return this.currentType === "content";
        }
    },
    methods: {
        changeType(type) {
            this.currentType = type;
        },
        replaceHighlight(keyword) {
            return keyword.replace(
                this.$store.state.searchTerm,
                `<span class="highlight">${this.$store.state.searchTerm}</span>`
            );
        },
        shorterDetails(content) {
            let index = content.indexOf(this.$store.state.searchTerm);
            let shorter = `...${content.substring(index - 20, index + 20)}...`;
            return shorter.replace(
                this.$store.state.searchTerm,
                `<span class="highlight">${this.$store.state.searchTerm}</span>`
            );
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/.highlight {
    background-color: rgba(96, 126, 121, 0.4);
}

.has-result {
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 9999rem;
    text-align: center;
    color: rgb(96, 126, 121);
    background-color: rgba(96, 126, 121, 0.4);
}

.result-count {
    margin-top: 1rem;
    color: rgb(96, 126, 121);
}
</style>