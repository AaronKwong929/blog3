const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    articleId: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().getTime()
    },
    updatedAt: {
        type: String,
        default: new Date().getTime()
    },
    user: {
        type: String,
        trim: true,
        required: true
    },
    published: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model(`Comment`, commentSchema);
