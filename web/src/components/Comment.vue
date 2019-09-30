<template>
    <div class="Comment">
        <input disabled type="text" v-model="this.$parent.to" />
        <input type="text" v-model="from" placeholder="From" />
        <textarea v-model="content" placeholder="Comment"></textarea>
        <button @click="sendComment">发送</button>
        <button @click="resetReply">Reset</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            from: "",
            content: ""
        };
    },
    methods: {
        ...mapActions({
            Send: "SEND_COMMENT",
            getDetails: "FIND_ARTICLE"
        }),
        async sendComment() {
            this.from = "";
            this.content = "";
            await this.Send({
                from: this.from,
                content: this.content,
                to: this.$parent.to,
                id: this.$route.params.id
            });
            // 不设一秒不能加载出来
            setTimeout(() => {
                this.getDetails(this.$route.params.id);
            }, 500);
        },
        resetReply() {
            this.$parent.to = "";
            this.from = "";
            this.content = "";
        }
    },
    computed: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
</style>