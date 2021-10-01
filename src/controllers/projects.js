'use strict';

const {createProject} = require ('../models/projects');
const {getUserIdByToken} = require ('../auth/models/user');


let createProjectHandler = async (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(' ').pop();
    let userId = await getUserIdByToken(token);
    await createProject(userId,req.body);
    res.status(200).json({
      status: 200,
      message: 'Project created successfully',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createProjectHandler,
};