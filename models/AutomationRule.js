const mongoose = require('mongoose');

const AutomationRuleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  enabled: { type: Boolean, default: true },
  trigger: { type: String, required: true },
  conditions: { type: [mongoose.Schema.Types.Mixed], default: [] },
  actions: { type: [String], default: [] },
  executedCount: { type: Number, default: 0 },
  lastExecutedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AutomationRule', AutomationRuleSchema);
