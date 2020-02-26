const mongoose = require('mongoose');

const { Schema } = mongoose;

const iOSCertificationSchema = new Schema({
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
  },
  certType: {
    type: String,
    enum: ['Provisioning', 'Push'],
  },
  expiredDate: {
    type: Date,
    required: true,
  },
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

module.exports = mongoose.model('IOSCertification', iOSCertificationSchema);
