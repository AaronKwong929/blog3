<template>
    <div id="app">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="routers">
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

</style>
