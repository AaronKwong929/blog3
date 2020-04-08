<template>
    <div id="Comment" v-if="comments">
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            commentForm: {},
        };
    },
    props: ['comments'],
    methods: {
        sendComment() {},
        reset() {}
    }
};
</script>

