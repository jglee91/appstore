const mongoose = require('mongoose');

const { Schema } = mongoose;

const applicationSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  buildType: {
    type: String,
    enum: ['Dev', 'Release', 'Test'],
  },
  desc: String,
  filePath: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Application', applicationSchema);
