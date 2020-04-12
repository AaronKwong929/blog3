<template>
    <!-- <el-container>
        <el-main>
            <el-timeline :reverse="true">
                <el-timeline-item
                    v-for="(item, index) in log"
                    :key="index"
                    :timestamp="item.timestamp"
                    placement="top"
                    color="#74b9ff"
                    size="large"
                >
                    <el-card class="card">
                        <h4>{{ item.title }}</h4>
                        <p
                            v-for="(content, index) in item.contents"
                            :key="index"
                        >
                            {{ index + 1 }} {{ content }}
                        </p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-main>
    </el-container> -->
    <div class="time-line">
        <div
            class="time-line-item"
            :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
            v-for="(item, index) in logs"
            :key="'log' + index"
        >
            {{ item.timestamp }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logs: [
                {
                    title: '开发版本3.0.0',
                    contents: [],
                    timestamp: '2019-08-23'
                },
                {
                    title: '开发版本3.1.0',
                    contents: ['登陆持久化', '新增开发日志页面'],
                    timestamp: '2019-08-26'
                },
                {
                    title: '开发版本3.2.0',
                    contents: [
                        '时间格式化更新（Linux和Win下格式保持一致）',
                        '各种交互操作完全整合到vuex.actions'
                    ],
                    timestamp: '2019-08-28'
                },
                {
                    title: '开发版本3.3.0',
                    contents: [
                        '增加搜索系统',
                        '搜索相关结果高亮',
                        '前端分页器'
                    ],
                    timestamp: '2019-09-08'
                },
                {
                    title: '开发版本3.4.0',
                    contents: ['评论区上线', '目体积优化'],
                    timestamp: '2019-09-30'
                },
                {
                    title: '开发版本3.5.0',
                    contents: ['首页UI更改', '轮播图实现'],
                    timestamp: '2019-10-12'
                },
                {
                    title: '开发版本3.6.0',
                    contents: ['Markdown编辑器样式更新，新增tool-bar'],
                    timestamp: '2019-10-17'
                },
                {
                    title: '开发版本3.7.0',
                    contents: ['图片上传和返回', '标签排序', '后端分页器'],
                    timestamp: '2019-11-07'
                },
                {
                    title: '开发版本3.9.0',
                    contents: ['Element-UI 重写侧栏/静态页'],
                    timestamp: '2019-12-01'
                },
                {
                    title: `开发版本3.9.1`,
                    contents: [
                        'Element-UI搭载基本完成',
                        '前台展示重构减少公式化'
                    ],
                    timestamp: '2020-01-29'
                },
                {
                    title: `开发版本3.9.2`,
                    contents: ['样式去后台化完成', '前台展示页重写完成'],
                    timestamp: '2020-02-02'
                }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
.time-line {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-item {
        min-height: 150px;
        width: 400px;
        position: relative;
        background-color: white;
        border-radius: 15px;
        margin: 20px 0;
    }

    &-item:before,
    &-item:after {
        position: absolute;
        top: 130px;
        content: '';
        width: 200px;
        height: 10px;
        box-shadow: 0 12px 15px rgba(0, 0, 0, 0.8);
        z-index: -1;
    }
    &-item:before {
        left: 5px;
        -webkit-transform: rotate(-5deg);
        -moz-transform: rotate(-5deg);
        transform: rotate(-5deg);
    }
    &-item:after {
        right: 5px;
        -webkit-transform: rotate(5deg);
        -moz-transform: rotate(5deg);
        transform: rotate(5deg);
    }
    .left {
        margin-left: -350px;
    }
    .right {
        margin-left: 350px;
    }
}
</style>
