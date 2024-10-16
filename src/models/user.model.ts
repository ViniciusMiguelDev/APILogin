import mongoose, { Schema, Document } from "mongoose";

// Definir a interface para tipagem TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Definir o Schema do Mongoose
const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
