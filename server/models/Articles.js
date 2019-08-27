const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: '新建文章'
    },
    type: {
        type: String,
        default: ''
    },
    tag: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    published: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: String,
        default: dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
    }
});

articleSchema.pre('save', async function(next) {
    const article = this;
    article.updatedAt = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
    next();
});

module.exports = mongoose.model('Article', articleSchema);
