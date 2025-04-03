import type { Request, Response } from "express";
import { getProfile, updateProfile, createPost, getPosts } from "./dashboard.service";
import { successResponse } from "../../success-engine/response";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extend the Request interface to include the 'user' property
interface AuthenticatedRequest extends Request {
  user: { id: string };
}

export const getProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await getProfile(req.user.id);
    successResponse(res, user, "Profile fetched successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to fetch profile" });
  }
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    successResponse(res, user, "Profile updated successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to update profile" });
  }
};

export const createPostController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, hashtags } = req.body;
    const userId = req.user.id;

    // Ensure req.file is defined
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const post = await createPost({
      userId,
      title,
      description,
      hashtags: hashtags.split(","),
      imageUrl: result.secure_url,
    });

    successResponse(res, post, "Post created successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to create post" });
  }
};

export const getPostsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const posts = await getPosts();
    successResponse(res, posts, "Posts fetched successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to fetch posts" });
  }
};
