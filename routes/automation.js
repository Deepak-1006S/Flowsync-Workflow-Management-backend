const express = require('express');
const router = express.Router();
const AutomationRule = require('../models/AutomationRule');

router.get('/rules', async (req, res, next) => {
  try {
    const rules = await AutomationRule.find().lean();
    res.json(rules);
  } catch (error) {
    next(error);
  }
});

router.post('/rules', async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedAt: new Date() };
    const rule = new AutomationRule(payload);
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    next(error);
  }
});

router.put('/rules/:id', async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedAt: new Date() };
    const rule = await AutomationRule.findOneAndUpdate(
      { id: req.params.id },
      payload,
      { new: true, runValidators: true }
    ).lean();
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    res.json(rule);
  } catch (error) {
    next(error);
  }
});

router.delete('/rules/:id', async (req, res, next) => {
  try {
    const rule = await AutomationRule.findOneAndDelete({ id: req.params.id });
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/rules/:id/toggle', async (req, res, next) => {
  try {
    const { enabled } = req.body;
    const rule = await AutomationRule.findOneAndUpdate(
      { id: req.params.id },
      { enabled, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    res.json(rule);
  } catch (error) {
    next(error);
  }
});

router.get('/triggers', (req, res) => {
  res.json(['manual', 'scheduled', 'event']);
});

router.get('/actions', (req, res) => {
  res.json(['create_task', 'send_notification', 'request_approval']);
});

router.get('/logs', async (req, res) => {
  res.json([]);
});

module.exports = router;
