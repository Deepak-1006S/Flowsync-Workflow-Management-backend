const mongoose = require('mongoose');

const ApprovalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approverId: { type: String, default: '' },
  itemId: { type: String, default: '' },
  itemType: { type: String, default: 'task' },
  requestedBy: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  reason: { type: String, default: '' },
  comments: { type: [mongoose.Schema.Types.Mixed], default: [] },
});

module.exports = mongoose.model('Approval', ApprovalSchema);
