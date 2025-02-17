import { Router } from "express";

import { updateUser, updatePassword, updateProfilePicture } from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";


const router = Router()

router.patch("/updatePassword/:uid", updatePassword, updatePasswordValidator)
router.put("/updateUser/:uid", updateUser, updateUserValidator)
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router