<template>
    <div id="app">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="router-views">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
    data() {
        return {};
    },
    components: {
        Sidebar
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    width: 20%;
    min-width: 10%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid rgb(158, 158, 158);
    background-color: #ddd;
}
.router-views {
    margin-left: 20%;
}
</style>
