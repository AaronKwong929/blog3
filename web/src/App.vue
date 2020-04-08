<template>
    <div>
        <el-container
            style="min-height: 100vh; max-width: 100%;"
            v-if="$route.meta.showAside"
        >
            <el-aside width="auto">
                <Sidebar></Sidebar>
            </el-aside>
            <el-main style="width: stretch; padding: 0;">
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-container
            style="min-height: 100vh; max-width: 100%;"
            v-if="!$route.meta.showAside"
        >
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
const Sidebar = () => import('./components/Sidebar');
export default {
    components: {
        Sidebar
    }
};
</script>
