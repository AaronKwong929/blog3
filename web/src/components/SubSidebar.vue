<template>
    <div id="subsidebar">
        <button class="btn" @click="back" title="返回"><i class="iconfont  icon-chexiaofanhuichehuishangyibu "></i></button>
        <button class="btn" @click="top" title="回到顶部">top</button>
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
        }
    }
};
</script>

<style lang="scss" scoped>
#subsidebar {
    text-align: center;
}

.btn {
    width: 3rem;
    height: 3rem;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: #ddd;
    margin: 1rem auto;
    right: .8%;
}

.btn:hover {
    background-color: rgba(96, 126, 121, 0.4);
    border-radius: 50%;
    transition: all 0.5s;
}

.btn:first-child {
    position: fixed;
    bottom: 8rem;
    
}

.btn:last-child {
    position: fixed;
    bottom: 3rem;
}

</style>
