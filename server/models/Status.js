const mongoose = require('mongoose');
const StatusSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().getTime(),
    },
});

module.exports = mongoose.model(`Status`, StatusSchema);
