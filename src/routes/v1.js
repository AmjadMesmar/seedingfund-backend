'use strict';

const express = require('express');
const router = express.Router();
const {createProjectHandler,getAllProjecstHandler,getProjectDetailsHandler,getUserProjectsHandler,updateProjectHandler,deleteProjectHandler} = require('../controllers/projects');
const {adminCheck,projectAuthprizationCheck} = require('../auth/middlewares/acl');
const bearer = require('../auth/middlewares/bearer');

// Global middleware
router.use(bearer);

// Project Routes
router.post('/projects',createProjectHandler);
router.get('/projects',adminCheck,getAllProjecstHandler);
router.get('/projects/user', getUserProjectsHandler);
router.get('/projects/:project_id', getProjectDetailsHandler);
router.put('/projects/:project_id', updateProjectHandler);
router.delete('/projects/:project_id',deleteProjectHandler);




// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});

module.exports = router;
