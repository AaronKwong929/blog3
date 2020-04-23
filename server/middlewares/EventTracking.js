const EventTrackingSchema = require('../models/EventTrack');

module.exports = eventCode => async(ctx, next) => {
    const event = new EventTrackingSchema({eventCode});
    await event.save();
    await next();
}