'use strict';

const client = require('./db');

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

async function getUserProjects(userId) {
  try {
    let SQL = `SELECT * FROM PROJECT WHERE user_id=$1`;
    let safeValues = [userId];
    let createProjectQuery = await client.query(SQL,safeValues);
    console.log (createProjectQuery);
    return createProjectQuery.rows;
    
  }
  catch (error) {
    throw new Error(error);
  }
    
}

  
module.exports = {
  createProject,
  getAllProjects,
  getUserProjects,
};