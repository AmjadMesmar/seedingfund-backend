/* eslint-disable no-unused-vars */
'use strict';
const client = require('../../models/db');
const {checkAuthorization} = require('../controllers/helpers');

// This Middleware will check if the user is an amin or not before authorizing:

function adminCheck(req, res, next) {
  if (req.user.is_admin) {
    next();
  } else {
    const error = new Error('User unauthorized, access denied!');
    error.statusCode = 403;
    throw error;
  }
}

// async function projectAuthprizationCheck(req, res, next) {
//   let authorized = await checkAuthorization(req.user.id,req.params.project_id,'project');
//   if (authorized === true || req.user.is_admin) {
//     next();
//   } else {
//     const error = new Error('User unauthorized, access denied!');
//     error.statusCode = 403;
//     throw error;
//   }
// }

module.exports = {
  adminCheck,
  // projectAuthprizationCheck,
};
