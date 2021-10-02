/* eslint-disable no-unused-vars */
'use strict';
const client = require('../../models/db');


function adminCheck(req, res, next) {
  if (req.user.is_admin) {
    next();
  } else {
    const error = new Error('User unauthorized, access denied!');
    error.statusCode = 403;
    throw error;
  }
}

function userCheck(req, res, next) {
  if (req.user.id === req.params.userId || req.user.is_admin) {
    next();
  } else {
    const error = new Error('User unauthorized, access denied!');
    error.statusCode = 403;
    throw error;
  }
}

module.exports = {
  adminCheck,
  userCheck,
};
