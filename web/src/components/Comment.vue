<template>
    <div class="Comment">
        <input type="text" v-model="from" placeholder="user" />
        <textarea v-model="content" placeholder="comment goes here"></textarea>
        <button @click="sendComment">123</button>
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
            await this.Send({
                user: this.from,
                content: this.content,
                id: this.$route.params.id
            });
            setTimeout(() => {
               this.getDetails(this.$route.params.id); 
            }, 500);
        }
    },
    computed: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
</style>