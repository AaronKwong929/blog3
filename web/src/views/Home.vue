<template>
    <div id="home">
        <template>
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item
                    v-for="(item, index) in carousalItem"
                    :key="'c' + index"
                >
                    <h2>{{ item.title }}</h2>
                </el-carousel-item>
            </el-carousel>
        </template>
        <el-card>
            <div style="text-align: center;">{{ date }}</div>
        </el-card>
        <el-card>
            <div style="text-align: center;">
                <el-link
                    type="primary"
                    @click.prevent.native="navigateToLogin"
                    >{{ sentence }}</el-link
                >
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '1',
            carousalItem: [
                {
                    title: `Welcome To Aaron's Blog.`
                },
                {
                    title: `Make Yourselves At Home.`
                },
                {
                    title: `No Commercial Available.`
                }
            ],
            date: this.$dateFormat(
                new Date(),
                'yyyy 年 MM 月 dd 日 hh : mm : ss'
            ),
            sentences: [`食得咸鱼抵得渴`, `鸡食放光虫`]
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
        },
        destroyTimer() {
            if (this.timeId) {
                clearInterval(this.timeId);
            }
        },
        navigateToLogin() {
            this.$router.push(`/login`);
        }
    },
    computed: {
        sentence() {
            let index = Math.floor(Math.random() * this.sentences.length);
            return this.sentences[index];
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
}

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
</style>
