<template>
    <div id="archive" class="router-view-general">
        <i class="iconfont icon-liebiao1"></i>
        <div class="router-title">
            归档
        </div>
        <searchBar></searchBar>
        <!-- <div class="search">
            <input type="text" v-model="searchTerm"/>
            <button @click="search">搜索</button>
        </div> -->
        <div class="list">
            <router-link
                v-for="(item, index) in List"
                :key="index"
                :to="'/article/' + item._id"
                tag="div"
                class="list-item"
            >
                <time>{{ item.updatedAt }}</time>
                <div class="line"></div>
                <div class="title">{{ item.title }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions} from "vuex";
import searchBar from "../components/SearchBar";
export default {
    data() {
        return {
            searchTerm: "",
        }
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
    methods: {
        ...mapActions({
            getArticles: "COMMON_GET_ARTICLES"
        })
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
    },
    components: {
        searchBar
    }
};
</script>
