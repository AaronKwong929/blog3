const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const recentSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    updatedAt: {
        type: String
    }
});

recentSchema.pre('save', async function(next) {
    const recent = this;
    recent.updatedAt = dateFormat(new Date(), 'yyyy-MM-dd hh:mm');
    next();
});

module.exports = mongoose.model('Recent', recentSchema);
