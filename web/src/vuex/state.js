let state = {
    token: '',
    articleList: [],
    articleDetails: {},
    adminArticleList: [],
    loginFail: false,
    searchTerm: '',
    searchResults: {
        titleResults: [],
        contentResults: []
    },
    recent: '',
    imgUrls: [],
    pageCount: 10, // 初始化值要大一点通过actions getCommonArticles逻辑分支
    currentPage: 1
};

export default state;
