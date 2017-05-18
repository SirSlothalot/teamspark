var express = require('express');
var router = express.Router();

var ctrlProject = require('../controllers/project');

// router.get('/', ctrlProject.getProjectList);

// router.get('/:projectName', ctrlProject.getProject);

router.get('/new', ctrlProject.renderNewProject);

router.post('/new', ctrlProject.submitNewProject);

router.get('/:projectTitle', ctrlProject.renderProject);

router.get('/:projectTitle/edit', ctrlProject.renderEditProject);

router.post('/:projectTitle/edit', ctrlProject.submitEditProject);



module.exports = router;
