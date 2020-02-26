const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const companySchema = new Schema({
  name: requiredString,
  code: {
    ...requiredString,
    unique: 1,
    uppercase: true,
  },
  creator: requiredString,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Company', companySchema);
