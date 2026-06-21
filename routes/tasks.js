const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.assignee) filters.assignee = req.query.assignee;
    if (req.query.workflowId) filters.workflowId = req.query.workflowId;

    const tasks = await Task.find(filters).lean();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOne({ id: req.params.id }).lean();
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedAt: new Date() };
    const task = new Task(payload);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedAt: new Date() };
    const task = await Task.findOneAndUpdate(
      { id: req.params.id },
      payload,
      { new: true, runValidators: true }
    ).lean();
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/complete', async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { id: req.params.id },
      { status: 'completed', updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/assign', async (req, res, next) => {
  try {
    const { assigneeId } = req.body;
    const task = await Task.findOneAndUpdate(
      { id: req.params.id },
      { assignee: assigneeId, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
