<template>
    <div id="home">
        <div class="center clearfix">
            <img :src="cover" />
            <div class="sentence hover-item" @click="navigateToLogin">
                {{ sentences[index] }}
            </div>
        </div>
        <div class="right">
            <div class="title">最近动态</div>
            <ul>
                <li
                    v-for="(item, index) in statusList"
                    :key="`status` + index"
                    class="item"
                >
                    <div class="date">
                        {{ item.createdAt | dateFormat }}
                    </div>
                    <div class="content">{{ item.content }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const cover = require('../static/img/cover.jpg');
export default {
    data() {
        return {
            sentences: [
                `食得咸鱼抵得渴`,
                `地上捡到宝，问天问地摞唔到`,
                `落雨大，水浸街，阿妈担柴上街卖`,
                `鸡公仔，尾弯弯`,
            ],
            sentenceId: null,
            cover,
            index: 0,
            loading: false,
            statusList: [],
        };
    },
    methods: {
        navigateToLogin() {
            this.$router.push(`/login`);
        },
        setTimer() {
            this.sentenceId = setInterval(() => {
                this.index = Math.floor(Math.random() * this.sentences.length);
            }, 30000);
        },
        destroyTimer() {
            if (this.sentenceId) {
                clearInterval(this.sentenceId);
            }
        },
        getStatus() {
            this.$axios
                .getFetch(this.$api.commonStatus)
                .then((res) => {
                    this.statusList = res.resultList;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        init() {
            this.getStatus();
            this.setTimer();
        },
    },
    filters: {
        dateFormat(date) {
            date = new Date(parseInt(date));
            const o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                S: date.getMilliseconds(), // 毫秒
            };

            let fmt = 'yyyy-MM-dd';
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1
                            ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }
            return fmt;
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.destroyTimer();
    },
};
</script>

<style lang="scss" scoped>
#home {
    height: calc(100vh - 130px);
    position: relative;
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > img {
            width: 200px;
            height: auto;
        }
        .sentence {
            position: relative;
            display: inline-block;
            outline: none;
            text-decoration: none;
            color: #5d6066;
            font-size: 20px;
            cursor: pointer;
            margin-top: 10px;
            font-size: 1.2rem;
            transition: all 0.3s;
            transform: scale(1);
        }
        .sentence:hover {
            color: #0089a7;
            transform: scale(1.1);
            transition: all 0.3s;
        }
    }
    .right {
        border-radius: 16px;
        transform: scale(1);
        height: 350px;
        width: 250px;
        background-color: white;
        position: absolute;
        top: 150px;
        right: 150px;
        overflow: auto;
        padding: 10px;
        transform: scale(1);
        .title {
            font-size: 18px;
            box-shadow: 0 4px 8px -8px black;
            line-height: 25px;
            text-align: center;
        }
        .item {
            margin: 30px 0;
            .date {
                font-size: 20px;
            }
            .content {
                font-weight: 300;
                font-size: 16px;
            }
        }
    }
    .right:hover {
        transition: all 0.3s;
        transform: scale(1.1);
    }
}
</style>
