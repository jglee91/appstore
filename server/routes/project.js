const { Router } = require('express');
const Project = require('../models/Project');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const projectList = await Project.find().populate('company');
    res.send(projectList);
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const project = await new Project(req.body).save();
    res.json(project);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});
router.put('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});
router.delete('/:projectId', async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
    if (!deletedProject) {
      res.status(404);
      throw new Error('The project is not found.');
    }
    res.send({ message: 'The project successfully deleted.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
