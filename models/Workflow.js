const mongoose = require('mongoose');

const generateWorkflowId = () => `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const WorkflowStepSchema = new mongoose.Schema({
  id: { type: String, required: true, default: () => `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
  nextSteps: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const WorkflowSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: generateWorkflowId,
    set: (value) => {
      if (typeof value === 'string' && value.trim() === '') {
        return undefined;
      }
      return value;
    },
  },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  trigger: { type: String, required: true },
  steps: { type: [WorkflowStepSchema], default: [] },
  published: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
