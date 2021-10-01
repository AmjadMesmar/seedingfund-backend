'use strict';

const express = require('express');
const router = express.Router();
const {createProjectHandler,getAllProjecstHandler,getProjectDetailsHandler,updateProjectHandler,deleteProjectHandler} = require('../controllers/projects');

const bearer = require('../auth/middlewares/bearer');

// Global middleware
router.use(bearer);

// Project Routes
router.post('/projects',createProjectHandler);
router.get('/projects',getAllProjecstHandler);
// router.get('/projects/:id', projectCheck, getProjectDetailsHandler);
// router.put('/projects/:id', projectCheck, updateProjectHandler);
// router.delete('/projects/:id', projectCheck, deleteProjectHandler);




// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});

module.exports = router;
