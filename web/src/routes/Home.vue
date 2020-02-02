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
        <el-card>
            <div style="text-align: center;">{{ date }}</div>
        </el-card>
        <img
            style="width: auto; height: 250px; margin: 0 auto; text-align: center; display: block; margin-top: 1rem;"
            :src="coverUrl"
        />
    </div>
</template>
<script>
const coverUrl = require('../static/img/cover.jpg');
import dateFormat from '../dateFormat';
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
            date: dateFormat(
                new Date(),
                'yyyy 年 MM 月 dd 日 hh : mm : ss'
            ),
            coverUrl
        };
    },
    methods: {
        setTimer() {
            this.timeId = setInterval(() => {
                this.date = dateFormat(
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
    
    mounted() {
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
