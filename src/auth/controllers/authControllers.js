'use strict';

const { createToken, deleteToken } = require('../models/jwt');
const {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPassword,
  getAllUsers,
} = require('../models/user');
const { authenticateWithToken } = require('../models/helpers');
const { validateEmail, validatePassword, checkPassword } = require('./helpers');

const signUpHandler = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.user_name;
    if(!email || !password || ! username){
      const error = new Error('Missing parameters, username, email or password!');
      error.statusCode = 403;
      throw error;
    }

    // Check if entered username has spaces:

    if(username.includes(' ')){
      const error = new Error('Username should not have spaces');
      error.statusCode = 403;
      throw error;
    }

    // Check if entered email format is valid:

    if (!validateEmail(email)) {
      const error = new Error('The email is not valid');
      error.statusCode = 403;
      throw error;
    }
    
    // Check if entered password is valid:

    if (!validatePassword(password)) {
      const error = new Error('The password is not valid, password shall include letters,numbers an at least 1 capital letter, 1 small letter and 1 special character');
      error.statusCode = 403;
      throw error;
    }

    let user = await getUserByEmail(req.body.email, req.body.user_name);

    /* Check if entered username or email already exists in the database, If none of the exists, create a new user with the given user_name and email to the database, else throw an error: */

    if (!user) {
      user = await createUser(req.body);
      let userId = user.id;
      let userTokens = await createToken(userId);

      // Delete token id, user_id and creation date before returning the tokens from data base for security measures: 
      delete userTokens.id;
      delete userTokens.user_id;
      delete userTokens.created_at;
      res.status(200).json(userTokens);
    } else {
      const error = new Error('User already exist!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
};

// This handler is used for updating the user's password:

const updateUserPasswordHandler = async (req, res, next) => {
  try {
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    if(!oldPassword || !newPassword){
      const error = new Error('Missing parameters, old_password or new_password');
      error.statusCode = 403;
      throw error;
    }

    // Check if new entered password is valid:

    if (!validatePassword(newPassword)) {
      const error = new Error('The password is not valid');
      error.statusCode = 403;
      throw error;
    }

    /* Check if entered old password is the same in database, if true update the user's password,
    else throw an error: */

    let user = await getUserById(req.user.id);
    const valid = await checkPassword(oldPassword, user.hashed_password);
    if (valid) {
      user = await updateUserPassword(user.id, newPassword);
      const response = {
        status: 200,
        message: 'Password updated successfully',
      };
      res.status(200).json(response);
    } else {
      const error = new Error('Incorrect old password!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
};

// This handler is to return user access and refresh tokens on signin request:

const signInHandler = async (req, res, next) => {
  try {
    delete req.tokens.created_at;
    res.status(200).json(req.tokens);
  } catch (e) {
    next(e);
  }
};

// This handler is to delete the user's access and refresh tokens on sign out request:

const signoutHandler = async (req, res, next) => {
  try {
    await deleteToken(req.user.id);
    res.status(200).json({
      status: 200,
      message: 'successfully logged out',
    });
  } catch (e) {
    next(e);
  }
};

// This handler is used to get new tokens for the user:

const refreshHandler = async (req, res, next) => {
  try {
    const user = await authenticateWithToken(req.body.refresh_token, 'refresh');
    if (user) {
      await deleteToken(user.id);
      const newTokens = await createToken(user.id);
      delete newTokens.id;
      delete newTokens.user_id;
      res.status(200).json(newTokens);
    } else {
      const error = new Error('Invalid token');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
};

const getAllUsersHandler = async (req, res, next) => {
  try {
    let allUsers = await getAllUsers();
    let users = allUsers.length;
    return res.status(200).json({users,allUsers});

  }
  catch (e) {
    next(e);
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
  signoutHandler,
  refreshHandler,
  updateUserPasswordHandler,
  getAllUsersHandler,
};
