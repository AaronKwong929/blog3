<template>
    <div id="not-found">
        <div class="title">401</div>
        <div class="details">授权已过期╮( •́ω•̀ )╭</div>
    </div>
</template>
<style lang="scss" scoped>
#not-found {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    color: #0380df;
    user-select: none;
}

.title {
    font-family: "Georgia";
    font-weight: 600;
    font-size: 10rem;
    width: 30rem;
    margin: 0 auto;
}

.details {
    font-size: 2rem;
    font-weight: 400;
    box-shadow: 0 0.5rem 0.5rem -0.5rem #aaa;
    width: 25rem;
    margin: 0 auto;
    padding-top: 3rem;
}
</style>
