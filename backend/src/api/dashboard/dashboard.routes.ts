import { Router } from "express";
import { getProfileController, updateProfileController } from "./dashboard.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { updateProfileSchema } from "./dashboard.schema";

const router = Router();

router.get("/profile", getProfileController);
router.put("/profile", validationMiddleware(updateProfileSchema), updateProfileController);

export const dashboardRoutes = router;
