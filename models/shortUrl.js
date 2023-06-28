const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        default: 1,
    },
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate,
    },
    note: {
        type: String,
        unique: true,
        sparse: true,
    },
});

// Pre-save middleware to automatically increment the id value
shortUrlSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            // Only update the id when creating a new document
            return next();
        }

        const lastShortUrl = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
        const newId = (lastShortUrl && lastShortUrl.id + 1) || 1;
        this.id = newId;

        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
