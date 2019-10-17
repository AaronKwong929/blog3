<template>
    <div id="Comment">
        <div class="comment-area" v-if="comments">
            <div v-for="(item, index) in comments" :key="index" class="comment">
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
        <div class="comment-create">
            <input
                disabled
                type="text"
                v-model="this.to"
                placeholder="本篇文章"
            />
            <input type="text" v-model="from" placeholder="From" v-focus />
            <textarea v-model="content"></textarea>
            <div class="empty-alert" v-show="empty">不能为空</div>
            <div class="comment-btn">
                <button @click="sendComment" class="btn-small">发送</button>
                <button @click="resetReply" class="btn-small">重置</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            from: "",
            content: "",
            to: "",
            empty: false
        };
    },
    props: ["comments"],
    methods: {
        ...mapActions({
            Send: "SEND_COMMENT",
            getDetails: "FIND_ARTICLE"
        }),
        async sendComment() {
            if (!this.from || !this.content) {
                this.empty = true;
                return setTimeout(() => {
                    return (this.empty = false);
                }, 3000);
            }
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
.comment {
    box-shadow: 0 0 0.8rem 0 #aaa;
    padding: 1rem;
    border-radius: 1rem;
    min-width: 40vw;
    margin: 1rem 6rem;
}
.comment-user {
    font-size: 1.2rem;
}
.comment-time {
    font-size: 0.9rem;
}
.comment-time::before {
    content: " - ";
}
.comment-details {
    font-size: 1.1rem;
    font-weight: 300;
    margin: 0.5rem 0;
}

.comment-create {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.comment-create > input,
.comment-create > textarea {
    margin-bottom: 1rem;
}

.comment-create > textarea {
    padding: 0.6rem;
    width: 60%;
    height: 20vh;
    border-radius: 1rem;

    color: #333;
    line-height: 1.2rem;
}

.comment-btn {
    display: flex;
    margin-bottom: 1rem;
}

.comment-btn > button:first-child {
    margin-right: 1rem;
}

.empty-alert {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.527);
    background-color: rgba(255, 0, 0, 0.527);
    color: black;
    border-radius: 1rem;
    padding: 0.5rem;
    margin: 0.5rem;
}
</style>