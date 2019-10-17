<template>
    <div id="unauthorized">
        <div class="title">401</div>
        <div class="details">╮( •́ω•̀ )╭ 要重新登陆呢 </div>
        两秒后跳转到登陆页面
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations({
            logout: "LOG_OUT"
        }),
    },
    mounted() {
        setTimeout(() => {
            this.logout();
        }, 2000);
    }
};
</script>
<style lang="scss" scoped>
#unauthorized {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    color: rgb(96, 126, 121);
    user-select: none;
}
.title {
    font-family: "Georgia";
    font-weight: 600;
    font-size: 10rem;
    width: 30rem;
    margin: 0 auto;
}
.details {
    font-size: 2rem;
    font-weight: 400;
    box-shadow: 0 0.5rem 0.5rem -0.5rem #aaa;
    width: 25rem;
    margin: 0 auto;
    padding-top: 3rem;
}
</style>
