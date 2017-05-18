var express = require('express');
var router = express.Router();

var ctrlProject = require('../controllers/project');

router.get('/', ctrlProject.getProjectList);

router.get('/:projectName', ctrlProject.getProject);

router.get('/new', ctrlProject.load);

router.post('/new', ctrlProject.submit);
