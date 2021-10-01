'use strict';

const { authenticateWithToken } = require('../models/helpers');
const { getTokenRecord } = require('../models/jwt');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(' ').pop();

    const tokenRecord = await getTokenRecord(token, 'access');
    if(!tokenRecord) throw new Error('Token is invalid or does not exist!');

    const validUser = await authenticateWithToken(token);

    req.user = validUser;

    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Token is invalid or does not exist!');
  }
};
