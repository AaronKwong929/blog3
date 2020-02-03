<template>
    <div id="error">
        <div class="title">{{ statusCode }}</div>
        <div class="details">
            ╮( •́ω•̀ )╭
            {{
                statusCode === 404
                    ? `找不到这一页呢`
                    : statusCode === 401
                    ? `要重新登陆呢`
                    : `不知道这是什么错误呢`
            }}
        </div>
        <div class="button">
            <el-button
                @click="option"
                type="success"
                size="small"
            >
                {{ statusCode === 401 ? `返回登录页` : `返回上一级` }}
            </el-button>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            statusCode: ''
        };
    },
    methods: {
        ...mapMutations({
            logout: 'LOG_OUT'
        }),
        getErrorType() {
            if (!this.$route.params.statusCode) {
                this.statusCode = 404;
            } else {
                this.statusCode = this.$route.params.statusCode;
                if (this.statusCode === 401) {
                    setTimeout(() => {
                        this.logout();
                    }, 2000);
                }
            }
        },
        option() {
            switch (this.statusCode) {
                // case 404:
                //     this.$router.go(-1);
                //     break;
                case 401:
                    this.$router.push('/login');
                    break;
                default:
                    this.$router.go(-1);
                    break;
            }
        }
    },
    mounted() {
        this.getErrorType();
    }
};
</script>
<style lang="scss" scoped>
#error {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    color: rgb(96, 126, 121);
    user-select: none;
    .title {
        font-family: 'Georgia';
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
    .button {
        margin-top: 1rem;
    }
}
</style>
