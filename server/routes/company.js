const { Router } = require('express');
const Company = require('../models/Company');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const companyList = await Company.find();
    res.send(companyList);
  } catch (err) {
    next(err);
  }
});
router.get('/:companyId', async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) {
      res.status(404);
      throw new Error('The company is not found.');
    }
    res.send(company);
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const company = await new Company(req.body).save();
    res.json(company);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});
router.put('/:companyId', async (req, res, next) => {
  try {
    const id = req.params.companyId;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    next(err);
  }
});
router.delete('/:companyId', async (req, res, next) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.companyId);
    if (!deletedCompany) {
      res.status(404);
      throw new Error('The company is not found.');
    }
    res.send({ message: 'The company successfully deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
