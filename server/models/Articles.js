const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: 'title'
    },
    type: {
        type: String,
        default: 'type'
    },
    tag: {
        type: String,
        default: 'tag'
    },
    content: {
        type: String,
        default: 'content'
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
