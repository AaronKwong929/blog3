const baseUrl = process.env.VUE_APP_API;

export const articleIndex = `${baseUrl}/common/articles`;

export const articleDetails = `${baseUrl}/common/getArticleDetails`;

export const search = `${baseUrl}/common/searchKeywords`;

/* 管理员模块 */

export const getDraft = `${baseUrl}/admin/draft?id=`;

export const updateDraft = `${baseUrl}/admin/draft`;

export const login = `${baseUrl}/admin/login`;

export const adminGetArticle = `${baseUrl}/admin/articles`;

export const adminNewArticle = `${baseUrl}/admin/draft`;

export const adminChangeArticleStatus = `${baseUrl}/admin/article`;

export const adminDeleteDraft = `${baseUrl}/admin/article?id=`;

export const adminChangePassword = `${baseUrl}/admin/password`;

export const adminGetComment = (id, index) => {
    return `${baseUrl}/admin/comment?articleId=${id}&pageIndex=${index}`;
};

export const adminChangeCommentStatus = `${baseUrl}/admin/comment`;

export const adminDeleteComment = `${baseUrl}/admin/comment?commentId=`;