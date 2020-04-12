<template>
    <div id="home">
        <img :src="cover" />
        <div class="sentence hover-item" @click="navigateToLogin">
            {{ sentences[index] }}
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
                `鸡公仔，尾弯弯`
            ],
            sentenceId: null,
            cover,
            index: 0
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
</style>
