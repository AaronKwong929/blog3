<template>
    <div id="admin">
        {{ List }}
        <hr />
    </div>
</template>

<script>
// import store from "../vuex/store.js";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {},
    computed: {
        ...mapState({
            List: state => {
                return state.articleList;
            }
        })
    },
    mounted() {
        this.$store.dispatch("GET_ARTICLES");
    },
    // store
};
</script>

<style lang="scss" scoped>
</style>
