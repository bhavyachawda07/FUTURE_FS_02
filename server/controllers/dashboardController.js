const asyncHandler = require('../utils/asyncHandler');
const Lead = require('../models/Lead');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
exports.getStats = asyncHandler(async (req, res, next) => {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const siteVisits = await Lead.countDocuments({ status: 'Site Visit' });

    res.status(200).json({
        success: true,
        data: {
            totalLeads,
            newLeads,
            convertedLeads,
            siteVisits
        }
    });
});

// @desc    Get dashboard analytics
exports.getAnalytics = asyncHandler(async (req, res, next) => {
    // Leads per month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const leadsPerMonth = await Lead.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Source distribution
    const sourceDistribution = await Lead.aggregate([
        {
            $group: {
                _id: '$source',
                value: { $sum: 1 }
            }
        },
        {
            $project: {
                name: '$_id',
                value: 1,
                _id: 0
            }
        }
    ]);

    // Property type distribution
    const propertyDistribution = await Lead.aggregate([
        {
            $group: {
                _id: '$propertyType',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                type: '$_id',
                count: 1,
                _id: 0
            }
        }
    ]);

    // Conversion rate and KPIs
    const total = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ status: 'Converted' });
    const active = await Lead.countDocuments({ status: { $ne: 'Lost' } });
    const conversionRate = total === 0 ? 0 : ((converted / total) * 100).toFixed(2);

    res.status(200).json({
        success: true,
        data: {
            leadsPerMonth,
            sourceDistribution,
            propertyDistribution,
            conversionRate: parseFloat(conversionRate),
            kpis: {
                totalLeads: total,
                activeLeads: active,
                convertedLeads: converted
            }
        }
    });
});

