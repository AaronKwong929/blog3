/* 公共模块 */
export const articleIndex = `/common/article`;

export const articleDetails = `/common/getArticleDetails`;

export const getComment = `/common/comment`;

export const sendComment = `/common/comment`

export const search = `/common/searchKeywords`;

/* 管理员模块 */

export const getDraft = `/admin/draft?id=`;

export const updateDraft = `/admin/draft`;

export const login = `/admin/login`;

export const adminGetArticle = `/admin/articles`;

export const adminNewArticle = `/admin/draft`;

export const adminChangeArticleStatus = `/admin/article`;

export const adminDeleteDraft = `/admin/article?id=`;

export const adminChangePassword = `/admin/password`;

export const adminGetComment = (id, index) => {
    return `/admin/comment?articleId=${id}&pageIndex=${index}`;
};

export const adminChangeCommentStatus = `/admin/comment`;

export const adminDeleteComment = `/admin/comment?commentId=`;

export const adminGetEventTrack = `/admin/eventTrack`;

export const adminStatus = `/admin/status`;

export const commonStatus = `/common/status`
