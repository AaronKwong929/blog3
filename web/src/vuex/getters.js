const getters = {
    articleList: state => state.articleList,
    articleListLength: getters => getters.articleList.length
}
export default getters;