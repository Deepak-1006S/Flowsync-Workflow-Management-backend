const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

router.get('/', async (req, res, next) => {
  try {
    const workflows = await Workflow.find().lean();
    res.json(workflows);
  } catch (error) {
    next(error);
  }
});

router.get('/templates', async (req, res, next) => {
  try {
    const templates = [
      {
        id: 'template_manual_approval',
        name: 'Manual Approval Workflow',
        description: 'Trigger task approvals manually with a review step.',
        trigger: 'manual',
        steps: [],
        published: false,
      },
      {
        id: 'template_scheduled_task',
        name: 'Scheduled Task Workflow',
        description: 'Run tasks on a scheduled event trigger.',
        trigger: 'scheduled',
        steps: [],
        published: false,
      },
    ];
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const workflow = await Workflow.findOne({ id: req.params.id }).lean();
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.id) {
      delete payload.id;
    }
    const workflow = new Workflow({ ...payload, updatedAt: new Date() });
    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.id) {
      delete payload.id;
    }
    const workflow = await Workflow.findOneAndUpdate(
      { id: req.params.id },
      { ...payload, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Workflow.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({ error: 'Workflow not found' });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/publish', async (req, res, next) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { id: req.params.id },
      { published: true, archived: false, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
