const mongoose = require('mongoose');
const EventTrackingSchema = new mongoose.Schema({
    eventCode: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().getTime()
    },
});

module.exports = mongoose.model(`EventTracking`, EventTrackingSchema);
