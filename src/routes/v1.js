'use strict';

const express = require('express');
const router = express.Router();
const {createProjectHandler} = require('../controllers/projects');

const bearer = require('../auth/middlewares/bearer');

// Global middleware
router.use(bearer);

// Project Routes
router.post('/projects',createProjectHandler);

// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
