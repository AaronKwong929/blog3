<template>
    <div id="Login" class="router-view-general">
        <i class="iconfont icon-login"></i>
        <div class="router-title">
            管理员登陆
        </div>
        <div>
            <div class="input user">
                <i class="iconfont icon-guanyu"></i>
                <input
                    v-model="name"
                    type="text"
                    placeholder="管理员账号"
                    v-focus
                />
            </div>
            <div class="input password">
                <i class="iconfont icon-suoding"> </i>
                <input
                    v-model="password"
                    type="password"
                    placeholder="密码"
                    @keyup.enter="Login()"
                />
            </div>
            <div class="alert" v-show="this.fail">登陆失败</div>
            <button class="btn btn-small" @click="Login()">登陆</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            name: "",
            password: ""
        };
    },
    computed: {
        ...mapState({
            fail: state => {
                return state.loginFail;
            }
        })
    },
    methods: {
        ...mapActions({ LOGIN: "LOGIN" }),
        Login() {
            return this.LOGIN({ name: this.name, password: this.password });
        }
    },
    mounted() {
        if (this.$store.state.token) {
            this.$router.push("/admin");
        }
    }
};
</script>


<style lang="scss" scoped>
.input {
    margin-top: 1rem;
    display: flex;
    align-items: center;
}

.input > .iconfont {
    font-size: 2rem;
    color: rgb(96, 126, 121);
}

input {
    border: none;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 1px solid #ddd; // 适应focus的蓝色边框
    color: rgb(96, 126, 121);
}

input:focus {
    border: 1px solid rgb(96, 126, 121);
    box-shadow: 0 0 15px rgb(96, 126, 121);
    text-shadow: none;
}

.btn-small {
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
