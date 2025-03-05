import type { Request, Response } from "express";
import { getProfile, updateProfile } from "./dashboard.service";
import { successResponse } from "../../success-engine/response";

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const user = await getProfile(req.user.id);
    successResponse(res, user, "Profile fetched successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to fetch profile" });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    successResponse(res, user, "Profile updated successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to update profile" });
  }
};
