
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import AccountModel from '../models/account';
import sendEmail from '../services/mail';
import jwt from 'jsonwebtoken';

const AuthController = {

  generateToken: payload => {
    return jwt.sign(payload, process.env.JWT_SECRET);
  },

  generateTokenCookie: (ctx, accountID, accountRole, rememberMe) => {

    let tokenLifespan = 900000; // 15 Minutes

    // Setup remember me
    if(rememberMe) tokenLifespan = 604800000; // 7 Days

    const tokenExpiresDate = Date.now() + tokenLifespan;

    const token = AuthController.generateToken({
      id: accountID,
      role: accountRole,
      exp: tokenExpiresDate,
      iat: Date.now()
    });

    ctx.cookies.set('jwt', token, {
      maxAge: tokenLifespan,
      expires: new Date(tokenExpiresDate),
      httpOnly: true,
      overwrite: true,
      path: '/'
    });

    return tokenExpiresDate;

  },

  handleLogout: ctx => {

    ctx.cookies.set('jwt', '', {
      maxAge: 1,
      expires: new Date(1),
      httpOnly: true,
      overwrite: true,
      path: '/'
    });

    ctx.response.status = 200;
    ctx.response.body = 'OK';

  },

  handleLogin: async ctx => {

    const body = ctx.request.body;
    let account, responseStatus, responseBody;

    try {
      account = await AccountModel.findOne({ username: body.username });
    } catch(err) {
      responseStatus = 500;
      responseBody = err;

      // todo handle this better
    }

    if(!account || !account.validPassword(body.password)) {

      responseStatus = 401;
      responseBody = {
        message: "Incorrect Email and/or Password."
      };

    } else {

      const expiryDate = AuthController.generateTokenCookie(ctx, account._id, account.role, body.rememberMe);

      responseStatus = 200;
      responseBody = {
        tokenExpires: expiryDate,
        account: {
          id: account._id,
          name: account.name,
          username: account.username,
          role: account.role,
          data: account.data
        }
      };
    }

    ctx.response.status = responseStatus;
    ctx.response.body = responseBody;

  },

  handleTokenRefresh: ctx => {

    ctx.response.status = 200;
    ctx.response.body = {
      tokenExpires: AuthController.generateTokenCookie(ctx, ctx.state.account.id, ctx.state.account.role, false)
    };

  },

  handlePing: async ctx => {

    let account, responseStatus, responseBody;

    try {
      account = await AccountModel.findById(ctx.state.account.id);
    } catch(err) {
      responseStatus = 401;
      responseBody = err;
    }

    if(!account) {
      responseStatus = 401;
      responseBody = 'Nope.';
    } else {

      responseStatus = 200;
      responseBody = {
        tokenExpires: ctx.state.account.exp,
        user: {
          id: account._id,
          name: account.name,
          username: account.username,
          role: account.role,
          data: account.data
        }
      }
    }

    ctx.response.status = responseStatus;
    ctx.response.body = responseBody;

  }

};

export default AuthController;