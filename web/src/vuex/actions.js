import Axios from '../axios';
// import router from '../router';
const baseURL = process.env.VUE_APP_API;
const actions = {
    // async ADMIN_GET_ARTICLES({ state }) {
    //     await Axios.get(`${baseURL}/admin`).then(res => {
    //         state.adminArticleList = res.data.articleList;
    //     });
    // },
    // async SAVE_ARTICLE({ state, dispatch }) {
    //     await Axios.put(`${baseURL}/admin/draft`, {
    //         article: state.articleDetails
    //     }).then(() => {
    //         dispatch('ADMIN_GET_ARTICLES');
    //     });
    // },
    // async COMMON_GET_ARTICLES({ state }) {
    //     if (state.currentPage <= state.pageCount) {
    //         await Axios.post(`${baseURL}/common/articles`, {
    //             currentPage: state.currentPage
    //         }).then(res => {
    //             // console.log(res.data.articles);
    //             state.pageCount = res.data.pageCount;
    //             state.currentPage++;
    //             state.articleList = state.articleList.concat(res.data.articles);
    //             // console.log(state.articleList);
    //             // console.log(`当前总页数：${state.pageCount}`);
    //         });
    //     }
    // },
    // async FIND_ARTICLE({ state }, id) {
    //     state.articleDetails = await state.articleList.find(item => {
    //         return item._id === id;
    //     });
    // },
    // async DELETE_ARTICLE({ dispatch }, id) {
    //     await Axios.post(`${baseURL}/admin/delete`, {
    //         id
    //     }).then(() => {
    //         dispatch('ADMIN_GET_ARTICLES');
    //         dispatch('COMMON_GET_ARTICLES');
    //     });
    // },
    // async PUBLISH_ARTICLE({ dispatch }, id) {
    //     await Axios.put(`${baseURL}/admin/publish`, {
    //         id
    //     }).then(() => {
    //         dispatch('ADMIN_GET_ARTICLES');
    //         dispatch('COMMON_GET_ARTICLES');
    //     });
    // },
    // async NEW_ARTICLE({ dispatch }) {
    //     await Axios.post(`${baseURL}/admin/draft`).then(() => {
    //         dispatch('ADMIN_GET_ARTICLES');
    //         dispatch('COMMON_GET_ARTICLES');
    //     });
    // },
    // async LOGIN({ state }, user) {
    //     await Axios.post(`${baseURL}/admin/login`, {
    //         name: user.name,
    //         password: user.password
    //     }).then(res => {
    //         if (res.data.code === 0) {
    //             state.token = res.data.adminToken;
    //             localStorage.setItem('token', res.data.adminToken);
    //             router.push('/admin');
    //         } else {
    //             state.loginFail = true;
    //         }
    //     });
    // },
    async UPDATE_IMAGE({ state }, event) {
        const { file } = event;
        let param = new FormData(); // 创建form对象
        param.append('file', file); // 通过append向form对象添加数据
        // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }; //添加请求头
        Axios.post(`${baseURL}/admin/upload`, param, config).then(res => {
            state.imgUrls.push(res.data.filename);
        });
    }
};

export default actions;
