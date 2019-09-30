<template>
    <div class="Comment">
        <div class="comment-area" v-if="comments">
            <div
                v-for="(item, index) in comments"
                :key="index"
                class="comment"
            >
                <span class="comment-user">{{ item.from }} </span>
                <span class="comment-time">
                    {{ item.time }}
                </span>
                <div v-if="item.to">回复：@{{ item.to }}</div>
                <div class="comment-details">
                    {{ item.content }}
                </div>
                <button @click="changeTo(item.from)">回复</button>
            </div>
        </div>

        <input disabled type="text" v-model="this.to" />
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
            content: "",
            to: ""
        };
    },
    props: ["comments"],
    methods: {
        ...mapActions({
            Send: "SEND_COMMENT",
            getDetails: "FIND_ARTICLE"
        }),
        async sendComment() {
            await this.Send({
                from: this.from,
                content: this.content,
                to: this.to,
                id: this.$route.params.id
            });
            // 不设一秒不能加载出来
            setTimeout(() => {
                this.getDetails(this.$route.params.id);
            }, 1000);
            this.from = "";
            this.content = "";
        },
        resetReply() {
            this.to = "";
            this.from = "";
            this.content = "";
        },
        changeTo(name) {
            this.to = name;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>