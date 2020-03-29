<template>
    <div id="login">
        <div class="login-section-wrapper">
            <img
                style="width: auto; height: 200px; margin: 1rem auto; text-align: center; display: block;"
                :src="coverUrl"
            />
            <div class="login-section-input-wrapper">
                <el-input
                    size="small"
                    placeholder="账号"
                    v-model="account"
                ></el-input>
                <el-input
                    size="small"
                    placeholder="密码"
                    type="password"
                    v-model="password"
                    @keyup.enter="login"
                ></el-input>
            </div>
            <div class="login-section-button-wrapper">
                <el-button @click="login" size="small" type="primary"
                    >登陆</el-button
                >
                <el-button @click="reset" size="small">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
const coverUrl = require('../static/img/cover.jpg');
import { login } from '../api';
import Axios from '../axios';
export default {
    data() {
        return {
            account: '',
            password: '',
            coverUrl
        };
    },
    methods: {
        async login() {
            await Axios.post(`${login}`, {
                account: this.account,
                password: this.password
            })
                .then(res => {
                    if (res.data.status !== 0) {
                        return this.$message.error(`${res.data.message}`);
                    }
                    this.$store.commit('LOGIN_SUCCESS', {
                        token: res.data.adminToken,
                        name: res.data.name
                    });
                })
                .catch(() => {
                    this.$message.error(`登陆失败：服务器错误`);
                });
        },
        reset() {
            this.account = ``;
            this.password = ``;
        }
    },
    mounted() {
        if (this.$store.state.token) {
            this.$router.push('/admin');
        }
    }
};
</script>
<style lang="scss" scoped>
#login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .login-section-wrapper {
        width: 50vw;
        height: 60vh;
        background-color: white;
        border-radius: 16px;
    }
    .login-section-button-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
    }
    .login-section-input-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /deep/ .el-input {
            margin: 0.5rem 0;
            width: 15rem;
        }
    }
}
</style>
