'use strict';

const { createProject, getAllProjects, getUserProjects, getProjectDetails, updateProject, deleteProject } = require('../models/projects');
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
    let count = allProjects.length;
    res.status(200).json({count,allProjects});
  } catch (e) {
    next(e);
  }
};

let getUserProjectsHandler = async (req, res, next) => {
  try {
    let allProjects = await getUserProjects(req.user.id);
    let count = allProjects.length;
    res.status(200).json({count,allProjects});
  } catch (e) {
    next(e);
  }
};


let getProjectDetailsHandler = async (req, res, next) => {
  try {
    let project = await getProjectDetails(req.params.project_id);
    res.status(200).json({project});
  } catch (e) {
    next(e);
  }
};

let updateProjectHandler = async (req, res, next) => {
  try {
    await updateProject(req.params.project_id, req.body);
    res.status(200).json('Project updated successfully!');
  } catch (e) {
    next(e);
  }
};

let deleteProjectHandler = async (req, res, next) => {
  try {
    await deleteProject(req.params.project_id);
    res.status(200).json('Project deleted successfully!');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createProjectHandler,
  getAllProjecstHandler,
  getUserProjectsHandler,
  getProjectDetailsHandler,
  updateProjectHandler,
  deleteProjectHandler,
};