import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;
const accountSchema = new Schema(
  {
    role: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    passwordResetToken: {
      type: String
    },

    passwordResetExpires: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

accountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Account', accountSchema);