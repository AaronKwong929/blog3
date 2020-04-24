const mongoose = require('mongoose');
const EventTrackingSchema = new mongoose.Schema({
    eventCode: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: String
    },
});

EventTrackingSchema.pre('save', async function (next) {
    const track = this;
    track.createdAt = new Date().getTime();
    next();
});

module.exports = mongoose.model(`EventTracking`, EventTrackingSchema);
