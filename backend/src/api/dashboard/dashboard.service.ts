import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import { BadRequestError, InternalServerError } from "../../success-engine/error";

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new BadRequestError("User not found");
  }
  return user;
};

export const updateProfile = async (userId: string, updateData: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  Object.assign(user, updateData);

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new InternalServerError("Failed to update profile");
  }
};
