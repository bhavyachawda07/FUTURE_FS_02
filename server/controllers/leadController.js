const asyncHandler = require('../utils/asyncHandler');
const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = asyncHandler(async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Lead.find(JSON.parse(queryStr));

    // Search by name, email, or phone
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = query.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { phone: searchRegex }
            ]
        });
    }

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Lead.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const leads = await query.populate({
        path: 'assignedTo',
        select: 'name email'
    });

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: leads.length,
        pagination,
        data: leads
    });
});

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
exports.getLead = asyncHandler(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id).populate({
        path: 'assignedTo',
        select: 'name email'
    });

    if (!lead) {
        return res.status(404).json({
            success: false,
            error: `Lead not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: lead
    });
});

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = asyncHandler(async (req, res, next) => {
    // Add user to req.body if not provided (default to creator)
    if (!req.body.assignedTo) {
        req.body.assignedTo = req.user.id;
    }

    const lead = await Lead.create(req.body);

    res.status(201).json({
        success: true,
        data: lead
    });
});

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = asyncHandler(async (req, res, next) => {
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
        return res.status(404).json({
            success: false,
            error: `Lead not found with id of ${req.params.id}`
        });
    }

    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: lead
    });
});

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = asyncHandler(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return res.status(404).json({
            success: false,
            error: `Lead not found with id of ${req.params.id}`
        });
    }

    await lead.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Add note to lead
// @route   POST /api/leads/:id/notes
// @access  Private
exports.addNote = asyncHandler(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return res.status(404).json({
            success: false,
            error: `Lead not found with id of ${req.params.id}`
        });
    }

    lead.notes.unshift({ text: req.body.text });
    await lead.save();

    res.status(200).json({
        success: true,
        data: lead.notes
    });
});

// @desc    Add follow-up to lead
// @route   POST /api/leads/:id/followups
// @access  Private
exports.addFollowUp = asyncHandler(async (req, res, next) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return res.status(404).json({
            success: false,
            error: `Lead not found with id of ${req.params.id}`
        });
    }

    lead.followUps.unshift({
        date: req.body.date,
        remark: req.body.remark
    });
    await lead.save();

    res.status(200).json({
        success: true,
        data: lead.followUps
    });
});
