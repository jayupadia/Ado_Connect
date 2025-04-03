import { Router } from "express";
import { getProfileController, updateProfileController, createPostController, getPostsController } from "./dashboard.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { updateProfileSchema } from "./dashboard.schema";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for images

router.get("/profile", getProfileController);
router.put("/profile", validationMiddleware(updateProfileSchema), updateProfileController);
router.post("/posts", upload.single("image"), createPostController); // Add route for creating posts
router.get("/posts", getPostsController); // Add route for retrieving posts

export const dashboardRoutes = router;
