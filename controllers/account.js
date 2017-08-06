
import bcrypt from 'bcrypt-nodejs';
import AccountModel from '../models/account';

const AccountController = {

  changePassword: async ctx => {

    let account, changePassword;
    const body = ctx.request.body;

    try {
      account = await AccountModel.findById(body.id);
    } catch(err) {
      //todo catch err
    }

    if (body.passwordNew !== body.passwordNewConfirm) {
      ctx.response.status = 400;
      ctx.response.body = {
        message: 'New Password and Confirm New Password do not match.'
      };
    }

    else if (!bcrypt.compareSync(body.passwordCurrent, account.password)) {
      ctx.response.status = 400;
      ctx.response.body = {
        message: 'Current Password is Incorrect.'
      };
    }

    else {

      const password = bcrypt.hashSync(body.passwordNew);

      try {
        changePassword = await AccountModel.findByIdAndUpdate( body.id, { $set: { password } }, { new: true });

        ctx.response.status = 200;
        ctx.response.body = {
          message: 'Your password has been changed.'
        };

        // todo validate password was changed
        // todo send email to the account, notifying them of the change
      } catch(err) {
        // todo catch err
        console.log(err);
      }
    }
  }

};

export default AccountController;