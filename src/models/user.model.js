import mongoose from "mongoose";
import UserSchema from "./schemas/UserSchema";
export const User = mongoose.models.users || mongoose.model('users', UserSchema);
export default User;