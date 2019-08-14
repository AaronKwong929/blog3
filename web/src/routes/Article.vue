<template>
    <div id="Article">
        {{ details.title }}
        {{ details.type }}
        {{ details.tag }}
        {{ details.updatedAt }}
        {{ details.content }}
    </div>
</template>
<script>
// import { mapActions } from "vuex";
export default {
    data() {
        return {
            details: ""
        };
    },
    methods: {
        // ...mapActions({
        //     findArticle: "FIND_ARTICLE"
        // }),
        getDetails() {
            this.details = this.$store.state.articleList.find(item => {
                return item._id === this.$route.params.id;
            });

            // this.details = this.findArticle(this.$route.params.id);

            // this.details = this.$store.dispatch('FIND_ARTICLE', this.$route.params.id)
        }
    },
    mounted() {
        this.getDetails();
    }
};
</script>
<style lang="scss" scoped>
</style>