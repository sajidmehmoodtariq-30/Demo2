import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Principal', 'Student'],
    required: true
  },
}, {
  timestamps: true
});

// Encrypt password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default User;