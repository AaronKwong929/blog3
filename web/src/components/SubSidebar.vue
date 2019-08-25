<template>
    <div id="subsidebar">
        <button class="btn" @click="back" title="返回">
            <i class="iconfont icon-chexiaofanhuichehuishangyibu"></i>
        </button>
        <button class="btn" @click="top" title="回到顶部"><i class="iconfont icon-zhiding"></i></button>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1);
        },
        top() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
#subsidebar {
    text-align: center;
    height:100%;
}

.btn {
    width: 3rem;
    height: 3rem;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: #ddd;
    margin: 0 auto;
    right: 0.8%;
}

.btn:hover,
.bar-item:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
    transition: all 0.5s;
}

button:first-child {
    margin-top: 600%;
}

button:nth-child(n + 2) {
    margin-top: 100%;
}
</style>
