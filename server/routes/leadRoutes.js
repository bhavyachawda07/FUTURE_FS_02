const express = require('express');
const {
    getLeads,
    getLead,
    createLead,
    updateLead,
    deleteLead,
    addNote,
    addFollowUp
} = require('../controllers/leadController');
const { validateLead } = require('../middleware/validationMiddleware');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router
    .route('/')
    .get(getLeads)
    .post(validateLead, createLead);

router
    .route('/:id')
    .get(getLead)
    .put(updateLead)
    .delete(deleteLead);

router.post('/:id/notes', addNote);
router.post('/:id/followups', addFollowUp);

module.exports = router;
