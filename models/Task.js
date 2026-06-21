const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignee: { type: String, default: '' },
  dueDate: { type: Date },
  workflowId: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  tags: { type: [String], default: [] },
  attachments: { type: [mongoose.Schema.Types.Mixed], default: [] },
  comments: { type: [mongoose.Schema.Types.Mixed], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
