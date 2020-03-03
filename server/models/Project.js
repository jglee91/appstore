const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: 1,
    uppercase: true,
  },
  serviceType: {
    type: String,
    enum: ['b2b', 'b2c'],
  },
  svnUrl: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
