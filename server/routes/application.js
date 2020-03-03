const { Router } = require('express');
const Application = require('../models/Application');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const applicationList = await Application.find().populate('project');
    res.send(applicationList);
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const application = await new Application(req.body).save();
    res.json(application);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});
router.put('/:applicationId', async (req, res, next) => {
  try {
    const id = req.params.applicationId;
    const updatedApplication = await Application.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedApplication);
  } catch (err) {
    next(err);
  }
});
router.delete('/:applicationId', async (req, res, next) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.applicationId);
    if (!deletedApplication) {
      res.status(404);
      throw new Error('The application is not found.');
    }
    res.send({ message: 'The application successfully deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
