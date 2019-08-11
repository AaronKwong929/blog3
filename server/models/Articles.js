const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: '1'
    },
    type: {
        type: String,
        default: '2'
    },
    tag: {
        type: String,
        default: '3'
    },
    content: {
        type: String,
        default:'4'
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

articleSchema.pre('save', async function (next) {
    const article = this;
    article.updatedAt = new Date().toLocaleString();
    next();
});

articleSchema.pre('save', async function (next) {
    const article = this;
    article.updatedAt = new Date().toLocaleString();
    next();
});

module.exports = mongoose.model('Article', articleSchema);
