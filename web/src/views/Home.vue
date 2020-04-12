<template>
    <div id="home">
        <header>
            <div class="header-left">
                Aar的个人博客
            </div>
            <div class="header-right">
                <router-link
                    :to="item.link"
                    v-for="(item, index) in headerItems"
                    :key="'hi' + index"
                    tag="div"
                    class="header-item hover-item"
                    >{{ item.title }}</router-link
                >
                <div>{{ date }}</div>
            </div>
        </header>
        <div class="body">
            <img :src="cover" />
            <div class="sentence hover-item" @click="navigateToLogin">
                {{ sentences[index] }}
            </div>
        </div>
        <footer>
            <a href="http://beian.miitbeian.gov.cn" target="_blank"
                >AaronKwong 2019 - {{ currentYear }} | 粤ICP备19111987号-1</a
            >
        </footer>
    </div>
</template>

<script>
const cover = require('../static/img/cover.jpg');
export default {
    data() {
        return {
            currentYear: new Date().getFullYear(),
            headerItems: [
                {
                    link: `/archive`,
                    title: `文章列表`
                },
                {
                    link: `/classification`,
                    title: `分类 | 标签`
                },
                {
                    link: `/about`,
                    title: `关于`
                },
                {
                    link: `/update`,
                    title: `更新`
                }
            ],
            date: this.$dateFormat(
                new Date(),
                'yyyy 年 MM 月 dd 日 hh : mm : ss'
            ),
            sentences: [
                `食得咸鱼抵得渴`,
                `地上捡到宝，问天问地摞唔到`,
                `落雨大，水浸街，阿妈担柴上街卖`,
                `鸡公仔，尾弯弯`
            ],
            timeId: null,
            sentenceId: null,
            cover,
            index: 0
        };
    },
    methods: {
        setTimer() {
            this.timeId = setInterval(() => {
                this.date = this.$dateFormat(
                    new Date(),
                    'yyyy 年 MM 月 dd 日 hh : mm : ss'
                );
            }, 1000);
            this.sentenceId = setInterval(() => {
                this.index = Math.floor(Math.random() * this.sentences.length);
            }, 30000);
        },
        destroyTimer() {
            if (this.timeId) {
                clearInterval(this.timeId);
            }
            if (this.sentenceId) {
                clearInterval(this.sentenceId);
            }
        },
        navigateToLogin() {
            this.$router.push(`/login`);
        }
    },
    mounted() {
        this.setTimer();
    },
    beforeDestroy() {
        this.destroyTimer();
    }
};
</script>

<style lang="scss" scoped>
#home {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
        to right,
        rgba($color: #70e1f5, $alpha: 0.9),
        rgba($color: #ffd194, $alpha: 0.9)
    );
}

header {
    height: 80px;
    background: transparent;
    color: #5b5d61;
    box-shadow: 0 7px 9px -9px rgba($color: #5b5d61, $alpha: 0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & > div {
        width: 50%;
    }
    .header-left {
        padding-left: 100px;
        font-size: 2rem;
        font-weight: 400;
        font-family: Courier, monospace;
    }
    .header-right {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        .header-item {
            cursor: pointer;
        }
        .header-item:hover {
            color: rgb(119, 136, 187);
            transform: scale(1.1);
            transition: all 0.3s;
        }
    }
}

.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 130px);
    & > img {
        width: 200px;
        height: auto;
    }

    .sentence {
        position: relative;
        display: inline-block;
        outline: none;
        text-decoration: none;
        color: #5b5d61;
        font-size: 20px;
        cursor: pointer;
        margin-top: 10px;
        font-size: 1.2rem;
    }

    .sentence:hover {
        color: rgb(119, 136, 187);
        transform: scale(1.1);
        transition: all 1s;
    }
}

footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    a {
        color: #5b5d61;
    }
    a:hover {
        transform: scale(1.1);
        transition: all 1s;
        border-bottom: 1px solid rgb(119, 136, 187);
        color: rgb(119, 136, 187);
    }
}
</style>
