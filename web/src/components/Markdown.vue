<template>
    <div id="editor">
        <textarea v-model="input" @input="update"></textarea>
        <div v-html="compiledMarkdown" v-highlight></div>
    </div>
</template>
<script>
import marked from "marked";
import lodash from "lodash";
// import hljs from "highlight.js";

export default {
    data() {
        return {
            input: "```javascript console.log('123') ```"
        };
    },
    computed: {
        compiledMarkdown: function() {
            return marked(this.input);
        }
    },
    methods: {
        update: lodash.debounce(function(e) {
            this.input = e.target.value;
        }, 2000)
    },
    // directives: {
    //     hightlight: {
    //         function(el) {
    //             let blocks = el.querySelectorAll("pre code");
    //             blocks.forEach(block => {
    //                 hljs.highlightBlock(block);
    //             });
    //         }
    //     }
    // }
};
</script>
<style lang="scss" scoped>
#editor {
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
}

textarea,
#editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
}

textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
}
</style>