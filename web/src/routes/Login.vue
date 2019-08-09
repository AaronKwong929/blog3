<template>
    <div id="Login" class="router-view-general">
        <i class="iconfont icon-RectangleCopy2"></i>
        <div class="router-title">
            管理员登陆
        </div>
        <div v-if="!this.$store.state.token">
            <div class="input user">
                <i class="iconfont icon-RectangleCopy2"></i>
                <input
                    v-model="name"
                    type="text"
                    placeholder="Account"
                    v-focus
                />
            </div>
            <div class="input password">
                <i class="iconfont icon-RectangleCopy6"> </i>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div class="alert" v-if="this.fail">登陆失败</div>
            <button class="btn btn-small" @click="login()">登陆</button>
        </div>
    </div>
</template>

<script>
import store from "../vuex/store";
export default {
    data() {
        return {
            name: "",
            password: "",
            fail: 0,
        };
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },
    methods: {
        login() {
            this.$axios
                .post("/api/admin/login", {
                    name: this.name,
                    password: this.password
                })
                .then(res => {
                    if (res.code === 0) {
                        this.$store.state.token = res.adminToken;
                        console.log(res.adminToken);
                        this.$router.push('/admin');
                    } else {
                        this.fail = 1;
                    }
                });
        }
    },
    store
};
</script>


<style lang="scss" scoped>
#Login > .iconfont {
    font-size: 3rem;
    position: absolute;
    top: -2rem;
    left: -1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input {
    margin-top: 1rem;
    display: flex;
    align-items: center;
}

.input > .iconfont {
    font-size: 2rem;
}

input {
    border: none;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 1px solid #ddd; // 适应focus的蓝色边框
}

input:focus {
    border: 1px solid #03a9f4;
    box-shadow: 0 0 15px #03a9f4;
    text-shadow: none;
}

.btn-small {
    // overwritten
    margin: 1rem 0 1rem 6rem;
    padding: 0.5rem 1.3rem;
}

.login-fail .iconfont {
    display: block;
    font-size: 5rem;
    padding-left: 5.5rem;
    color: red;
}

.fail-msg {
    padding-left: 6rem;
}

.alert {
    border-radius: 1rem;
    border: 1px solid red;
    padding: 1rem 0.5rem;
    width: 10rem;
    margin: 1rem 3rem;
    background: rgb(255, 132, 132);
    text-align: center;
}
</style>
