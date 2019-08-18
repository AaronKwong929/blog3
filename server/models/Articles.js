const mongoose = require('mongoose');

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
        default: new Date().toLocaleString()
    }
});

articleSchema.pre('save', async function(next) {
    const article = this;
    article.updatedAt = new Date().toLocaleString();
    next();
});

module.exports = mongoose.model('Article', articleSchema);
