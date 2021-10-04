'use strict';

const client = require('./db');

// Create a new project and add it to database:

async function createProject(loggedInUserId, project) {
  try {
    let SQL = `INSERT INTO PROJECT (user_id,project_name,project_description,project_sector) VALUES ($1, $2, $3,$4) RETURNING *;`;

    let project_name = project.project_name;
    let project_description = project.project_description;
    let project_sector = project.project_sector;
    let safeValues = [loggedInUserId,project_name, project_description, project_sector];

    let createProjectQuery = await client.query(SQL,safeValues);
    return createProjectQuery.rows[0];

  }
  catch (error) {
    throw new Error(error);
  }


}

// Get all projects from database:

async function getAllProjects() {
  try {
    let SQL = `SELECT * FROM PROJECT`;
    let createProjectQuery = await client.query(SQL);
    return createProjectQuery.rows;
  
  }
  catch (error) {
    throw new Error(error);
  }
  
}

// Get all projects for a specific user:

async function getUserProjects(userId) {
  try {
    let SQL = `SELECT * FROM PROJECT WHERE user_id=$1`;
    let safeValues = [userId];
    let createProjectQuery = await client.query(SQL,safeValues);
    return createProjectQuery.rows;
    
  }
  catch (error) {
    throw new Error(error);
  }
    
}

// Get a project's details:

async function getProjectDetails(projectId) {
  try {
    let SQL = `SELECT * FROM PROJECT WHERE id=$1`;
    let safeValues = [projectId];
    let createProjectQuery = await client.query(SQL,safeValues);
    return createProjectQuery.rows[0];
      
  }
  catch (error) {
    throw new Error(error);
  }
      
}

// Edit project's information and update it into the databse:

async function updateProject(projectId,body) {
  try {
    let SQL = `UPDATE PROJECT SET project_status=$1 WHERE id=$2;`;
    // let project_name = body.project_name;
    // let project_description = body.project_description;
    // let project_sector = body.project_sector;
    let project_status = body.project_status;
    let safeValues = [project_status,projectId];
    let createProjectQuery = await client.query(SQL,safeValues);
    return createProjectQuery;
        
  }
  catch (error) {
    throw new Error(error);
  }
        
}

// Delete a specific project:

async function deleteProject(projectId) {
  try {
    let SQL = `DELETE FROM PROJECT WHERE id=$1;`;
    let safeValues = [projectId];
    let createProjectQuery = await client.query(SQL,safeValues);
    return createProjectQuery;
          
  }
  catch (error) {
    throw new Error(error);
  }
          
}
  

  
module.exports = {
  createProject,
  getAllProjects,
  getUserProjects,
  getProjectDetails,
  updateProject,
  deleteProject,
};