<template>
    <div id="home">
        <template>
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item
                    v-for="item in carousalItem"
                    :key="item.index"
                >
                    <h2>
                        {{ item.title
                        }}<span v-if="item.subTitle">
                            - {{ item.subTitle }}</span
                        >
                    </h2>
                </el-carousel-item>
            </el-carousel>
        </template>
        <!-- <el-collapse
            v-model="activeName"
            accordion
            style="width: 80%; margin: 0 auto;"
        >
            <el-collapse-item title="最近状态" name="1">
                <div>
                    {{ this.$store.state.recent.content }}
                </div>
                <div>
                    {{ this.$store.state.recent.updatedAt }}
                </div>
            </el-collapse-item>
            <el-collapse-item title="最新文章" name="2">
                <div>
                    <router-link
                        v-for="(item, index) in List"
                        :key="index"
                        :to="'/article/' + item._id"
                        tag="div"
                        class="list-item"
                    >   
                        <div class="article-col">
                            <span class="title item-left">{{
                                item.title
                            }}</span>
                        </div>
                        <div class="article-col">
                            <span class="item-left">
                                <i class="iconfont icon-yingyongAPP"></i
                                >{{ item.type }}
                            </span>
                            <span class="item-right">
                                <i class="iconfont icon-biaoqian"></i
                                >{{ item.tag }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </el-collapse-item>
        </el-collapse> -->
        <el-card>
            <div style="text-align: center;">{{ date }}</div>
        </el-card>
        <el-card>
            <div style="text-align: center;">
                {{ this.$store.state.recent.content }} by Aaron -
                {{ this.$store.state.recent.updatedAt }}
            </div>
        </el-card>
        <img
            style="width: auto; height: 250px; margin: 0 auto; text-align: center; display: block; margin-top: 1rem;"
            :src="coverUrl"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// const cover = '@/static/img/cover.jpg';
const coverUrl = require('../static/img/cover.jpg');
export default {
    data() {
        return {
            activeName: '1',
            carousalItem: [
                {
                    index: `c1`,
                    title: `Welcome To`
                },
                {
                    index: `c2`,
                    title: `Aaron's Blog.`
                },
                {
                    index: `c3`,
                    title: `Make Yourselves At Home.`
                },
                {
                    index: `c4`,
                    title: `No Commercial Available.`
                }
            ],
            date: this.$dateFormat(
                new Date(),
                'yyyy 年 MM 月 dd 日   hh : mm : ss'
            ),
            coverUrl
        };
    },
    methods: {
        ...mapActions({
            getArticles: 'COMMON_GET_ARTICLES',
            getRecent: 'GET_RECENT'
        }),

        setTimer() {
            this.timeId = setInterval(() => {
                this.date = this.$dateFormat(
                    new Date(),
                    'yyyy 年 MM 月 dd 日 hh : mm : ss'
                );
            }, 1000);
        },
        destroyTimer() {
            if (this.timeId) {
                clearInterval(this.timeId);
            }
        }
    },
    computed: {
        ...mapState({
            List: state => {
                return state.articleList.slice(0, 5);
            }
        })
    },
    mounted() {
        if (this.$store.state.articleList.length === 0) {
            this.getArticles();
        }
        if (this.$store.state.recent === '') {
            this.getRecent();
        }
        this.setTimer();
    },
    beforeDestroy() {
        this.destroyTimer();
    }
};
</script>

<style lang="scss" scoped>
/deep/ .el-carousel__item:nth-child(2n) {
    background-color: #a29bfe;
}
/deep/ .el-carousel__item:nth-child(2n + 1) {
    background-color: #74b9ff;
}
h2 {
    text-align: center;
    font: {
        weight: 300;
        size: 3rem;
    }
    line-height: 300px;
    color: #475669;
    opacity: 0.75;
}
.item-left {
    flex-grow: 1;
}
.item-right {
    align-self: flex-end;
    justify-self: flex-end;
}
.article-col {
    display: flex;
}
</style>
