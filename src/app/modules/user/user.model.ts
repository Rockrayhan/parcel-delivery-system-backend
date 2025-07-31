import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'sender', 'receiver'], required: true },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await bcryptjs.hash(this.password, 10);
    this.password = hashed;
  }
  next();
});

export const User = model<IUser>('User', userSchema);
