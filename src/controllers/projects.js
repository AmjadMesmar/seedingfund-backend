'use strict';

const { createProject, getAllProjects } = require('../models/projects');
const { getUserIdByToken } = require('../auth/models/user');


let createProjectHandler = async (req, res, next) => {
  try {
    await createProject(req.user.id, req.body);
    res.status(200).json({
      status: 200,
      message: 'Project created successfully',
    });
  } catch (e) {
    next(e);
  }
};

let getAllProjecstHandler = async (req, res, next) => {
  try {
    let allProjects = await getAllProjects();
    res.status(200).json(allProjects);
  } catch (e) {
    next(e);
  }
};

let getProjectDetailsHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    let userId = await getUserIdByToken(token);
    await createProject(userId, req.body);
    res.status(200).json({
      status: 200,
      message: 'Project created successfully',
    });
  } catch (e) {
    next(e);
  }
};

let updateProjectHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    let userId = await getUserIdByToken(token);
    await createProject(userId, req.body);
    res.status(200).json({
      status: 200,
      message: 'Project created successfully',
    });
  } catch (e) {
    next(e);
  }
};

let deleteProjectHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    let userId = await getUserIdByToken(token);
    await createProject(userId, req.body);
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
  getAllProjecstHandler,
  getProjectDetailsHandler,
  updateProjectHandler,
  deleteProjectHandler,
};