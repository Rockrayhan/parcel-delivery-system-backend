import { Schema, model } from 'mongoose';
import bcryptjs from "bcryptjs" ;
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'sender', 'receiver'],
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// Instance method to check password
userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  hashedPassword: string
) {
  return await bcryptjs.compare(givenPassword, hashedPassword);
};

export const User = model<IUser>('User', userSchema);
