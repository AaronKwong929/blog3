<template>
    <div class="carousal-wrap">
        <div id="carousal">
            <transition-group class="slide-ul" name="list">
                <div
                    v-for="(list, index) in slideList"
                    :key="'list' + index"
                    v-show="index === currentIndex"
                >
                    <img :src="list.image" :alt="list.desc" />
                </div>
            </transition-group>
            <div class="carousal-items">
                <div
                    v-for="(item, index) in slideList.length"
                    :key="index"
                    :class="{ active: index === currentIndex }"
                    @mouseover="change(index)"
                    @mouseenter="stop()"
                    @mouseleave="go()"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import blog from "../static/img/blog.png";
import commercial from "../static/img/commercial.png"
export default {
    data() {
        return {
            slideList: [
                {
                    desc: "blog",
                    image: blog
                },
                {
                    desc: "commercial",
                    image: commercial
                }
            ],
            currentIndex: 0,
            timer: ""
        };
    },
    methods: {
        go() {
            this.timer = setInterval(() => {
                this.autoPlay();
            }, 4000);
        },
        stop() {
            clearInterval(this.timer);
            this.timer = "";
        },
        change(index) {
            this.currentIndex = index;
        },
        autoPlay() {
            this.currentIndex++;
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0;
            }
        },
        destroyPlay() {
            if (this.timer) {
                clearInterval(this.timeId);
            }
        }
    },
    created() {
        this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.autoPlay();
            }, 4000);
        });
    },
    beforeDestroy() {
        this.destroyPlay();
    }
};
</script>

<style lang="scss" scoped>
.carousal-wrap {
    margin: 0 1rem;
    width: 650px;
}

#carousal {
    position: relative;
    height: 40vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.slide-ul {
    div {
        position: absolute;
    }
}

.carousal-items {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    div {
        height: 0.5rem;
        width: 2rem;
        background-color: #b2b2b2;
        cursor: pointer;
    }
    .active {
        background-color: rgba(96, 126, 121, 0.5);
    }
}

.list-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
}

.list-enter {
    transform: translateX(100%);
}

.list-leave {
    transform: translateX(0);
}

.list-leave-to {
    transition: all 1s ease;
    transform: translateX(-100%);
}
</style>