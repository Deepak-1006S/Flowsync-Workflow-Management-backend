const express = require('express');
const router = express.Router();
const Approval = require('../models/Approval');

router.get('/', async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    const approvals = await Approval.find(filters).lean();
    res.json(approvals);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const approval = new Approval(payload);
    await approval.save();
    res.status(201).json(approval);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/approve', async (req, res, next) => {
  try {
    const payload = req.body;
    const approval = await Approval.findOneAndUpdate(
      { id: req.params.id },
      { status: 'approved', approvedAt: new Date(), ...payload },
      { new: true, runValidators: true }
    ).lean();
    if (!approval) {
      return res.status(404).json({ error: 'Approval not found' });
    }
    res.json(approval);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/reject', async (req, res, next) => {
  try {
    const payload = req.body;
    const approval = await Approval.findOneAndUpdate(
      { id: req.params.id },
      { status: 'rejected', rejectedAt: new Date(), ...payload },
      { new: true, runValidators: true }
    ).lean();
    if (!approval) {
      return res.status(404).json({ error: 'Approval not found' });
    }
    res.json(approval);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
