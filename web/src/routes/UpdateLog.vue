<template>
    <div id="log" class="router-view-general">
        <i class="iconfont icon-custom-update"></i>
        <div class="router-title">
            开发日志
        </div>
        <div class="timeline">
            <el-timeline :reverse="true">
                <el-timeline-item
                    v-for="(item, index) in log"
                    :key="index"
                    :timestamp="item.timestamp"
                    placement="top"
                    color="#74b9ff"
                    size="large"
                >
                    <el-card>
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            log: [
                {
                    title: '开发版本3.0 上线版本1.0',
                    contents: [],
                    timestamp: '2019-8-23'
                },
                {
                    title: '开发版本3.1 上线版本1.1',
                    contents: ['登陆持久化', '新增开发日志页面'],
                    timestamp: '2019-8-26'
                },
                {
                    title: '开发版本3.2 上线版本1.2',
                    contents: [
                        '时间格式化更新（Linux和Win下格式保持一致）',
                        '各种交互操作完全整合到vuex.actions'
                    ],
                    timestamp: '2019-8-28'
                },
                {
                    title: '开发版本3.3 上线版本1.3',
                    contents: [
                        '增加搜索系统',
                        '搜索相关结果高亮',
                        '前端分页器'
                    ],
                    timestamp: '2019-9-8'
                },
                {
                    title: '开发版本3.4 上线版本1.4',
                    contents: ['评论区上线', '目体积优化'],
                    timestamp: '2019-9-30'
                },
                {
                    title: '开发版本3.5 上线版本1.5',
                    contents: ['首页UI更改', '轮播图实现'],
                    timestamp: '2019-10-12'
                },
                {
                    title: '开发版本3.6 上线版本1.6',
                    contents: ['Markdown编辑器样式更新，新增tool-bar'],
                    timestamp: '2019-10-17'
                },
                {
                    title: '开发版本3.7 上线版本1.7',
                    contents: ['图片上传和返回', '标签排序', '后端分页器'],
                    timestamp: '2019-11-7'
                },
                {
                    title: '开发版本3.9 上线版本1.9',
                    contents: ['Element-UI 重写侧栏/静态页'],
                    timestamp: '2019-12-1'
                }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
h4 {
    font: {
        weight: 400;
        size: 1.3rem;
    }
}
</style>
