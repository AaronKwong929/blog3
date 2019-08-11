<template>
    <div id="draft">
        <input type="text" v-model="title" placeholder="标题" />
        <input type="text" v-model="tag" placeholder="标签" />
        <input type="text" v-model="type" placeholeer="类型" />
        <textarea v-model="content" placeholder="正文"></textarea>
        <!-- <button @click="show">显示vuex内容</button> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: "",
            tag: "",
            type: "",
            content: ""
        };
    },
    methods: {
        getItem() {
            this.title = this.$store.state.articleDetails.title;
            this.tag = this.$store.state.articleDetails.tag;
            this.type = this.$store.state.articleDetails.type;
            this.content = this.$store.state.articleDetails.content;
        },
        save() {
            this.$store.state.articleDetails.title = this.title;
            this.$store.state.articleDetails.tag = this.tag;
            this.$store.state.articleDetails.type = this.type;
            this.$store.state.articleDetails.content = this.content;
        },
        // show() {
        //     console.log(this.$store.state.articleDetails);
        // }
    },
    mounted() {
        this.getItem();
    },
    updated() {
        // 数据更新马上保存到vuex
        this.save();
        this.$store.dispatch('SAVE_ARTICLE');
    }
};
</script>
<style lang="scss" scoped>
</style>