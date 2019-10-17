<template>
    <div id="Time">
        <span>{{ date | formatDate }}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: ""
        };
    },
    filters: {
        formatDate() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            return `${year}-${month}-${day} ${
                hours < 10 ? "0" + hours : hours
            }:${minutes < 10 ? "0" + minutes : minutes}`;
        }
    },
    methods: {
        setTimer() {
            this.timeId = setInterval(() => {
                this.date = new Date();
            }, 60000);
        },
        destroyTimer() {
            if (this.timeId) {
                clearInterval(this.timeId);
            }
        }
    },
    mounted() {
        this.setTimer();
    },
    beforeDestroy() {
        this.destroyTimer();
    }
};
</script>
<style lang="scss" scoped>
#Time {
    font-weight: 300;
    font-family: "Times New Roman", Times, serif;
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    border-radius: 1rem;
}
</style>