<template>
    <div id="app">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="router-views">
            <router-view></router-view>
        </div>
        <div class="subsidebar">
            <SubSidebar></SubSidebar>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import SubSidebar from './components/SubSidebar'
export default {
    components: {
        Sidebar,
        SubSidebar
    },
    created() {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            this.$store.state.token = token;
        }
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    width: 15%;
    min-width: 10%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: .6rem 0 .6rem -.6rem #aaa;
    background-color: #ddd;
}
.router-views {
    margin-left: 15%;
    margin-right: 5%;
}
.subsidebar {
    width: 5%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #ddd;
    box-shadow: -.6rem 0 .6rem -.6rem #aaa;
}
</style>
