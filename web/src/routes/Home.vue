<template>
    <div id="home">
        <Carousal></Carousal>
    </div>
</template>

<script>
const Carousal = () => import("../components/Carousal");
export default {
    components: {
        Carousal
    }
};
</script>
