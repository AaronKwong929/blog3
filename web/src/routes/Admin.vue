<template>
    <div id="admin">
        <button @click="logout" class="btn btn-small">
            <i class="iconfont icon-logout"></i>
        </button>
        <button @click="newArticle" class="btn btn-small">
            <i class="iconfont icon-jiahao"></i>
        </button>
        <div class="list">
            <div v-for="item in this.unpublishedList" :key="item._id">
                <span class="title">{{ item.title }}</span>
                <span class="type">{{ item.type }}</span>
                <span class="tag">{{ item.tag }}</span>
                <span class="time">{{ item.updatedAt }}</span>
                <router-link :to="'/draft/' + item._id"
                    ><i class="iconfont icon-bianji"></i
                ></router-link>
                <button @click="publish(item._id)">
                    <i class="iconfont icon-fabu5"></i>
                </button>
                <button @click="deleteArticle(item._id)">
                    <i class="iconfont icon-shanchu2"></i>
                </button>
            </div>
            <hr />
            <div v-for="item in this.publishedList" :key="item._id">
                <span class="title">{{ item.title }}</span>
                <span class="type">{{ item.type }}</span>
                <span class="tag">{{ item.tag }}</span>
                <span class="time">{{ item.updatedAt }}</span>
                <!-- <router-link :to="'/draft/' + item._id"
                    ><i class="iconfont icon-bianji"></i
                ></router-link> -->
                <button @click="publish(item._id)">
                    <i class="iconfont icon-chexiaofanhuichehuishangyibu"></i>
                </button>
                <!-- <button @click="deleteArticle(item._id)">
                    <i class="iconfont icon-shanchu2"></i>
                </button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations({
            logout: "LOG_OUT"
        }),
        ...mapActions({
            getArticles: "ADMIN_GET_ARTICLES",
            updateCommonArticles: "COMMON_GET_ARTICLES"
        }),
        newArticle() {
            this.$axios.post("/api/admin/draft").then(() => {
                // console.log(res.data.article);
                this.getArticles();
                this.updateCommonArticles();
                // setTimeout(() => {
                //     this.$router.push(`/draft/${res.data.article._id}`);
                // }, 1000);
                // // await this.$router.push(`/draft/${res.data.article._id}`);
            });
        },
        async deleteArticle(id) {
            await this.$axios
                .post("/api/admin/delete", {
                    id
                })
                .then(() => {
                    this.getArticles();
                });
            await this.updateCommonArticles();
        },
        async publish(id) {
            await this.$axios
                .put("/api/admin/publish", {
                    id
                })
                .then(() => {
                    this.getArticles();
                });
            await this.updateCommonArticles();
        }
    },
    computed: {
        ...mapState({
            List: state => {
                return state.adminArticleList;
            },
            unpublishedList: state => {
                return state.adminArticleList.filter(item => {
                    return item.published === false;
                });
            },
            publishedList: state => {
                return state.adminArticleList.filter(item => {
                    return item.published === true;
                });
            }
        })
    },
    mounted() {
        this.getArticles();
    }
};
</script>

<style lang="scss" scoped>
</style>
