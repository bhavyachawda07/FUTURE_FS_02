const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const followUpSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    remark: {
        type: String,
        required: true
    }
});

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    propertyType: {
        type: String,
        enum: ['1BHK', '2BHK', 'Villa', 'Plot'],
        required: [true, 'Please specify property type']
    },
    budget: {
        type: Number,
        required: [true, 'Please add a budget']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    source: {
        type: String,
        enum: ['Website', 'Instagram', 'Call', 'Referral'],
        default: 'Website'
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Site Visit', 'Converted', 'Lost'],
        default: 'New'
    },
    notes: [noteSchema],
    followUps: [followUpSchema],
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
