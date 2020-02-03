import Axios from '../axios';
const baseURL = process.env.VUE_APP_API;
const actions = {
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
