const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const {
  validateUserBody,
  validateEmailVerify,
} = require("../../utils/validate");

const { schemas } = require("../../models/user");

const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post(
  "/register",
  validateUserBody(schemas.userAuthSchema),
  ctrl.register
);

router.post("/login", validateUserBody(schemas.userAuthSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/verify/verificationToken", ctrl.verify);
router.post(
  "/verify",
  validateEmailVerify(schemas.emailSchema),
  ctrl.resendEmailVerify
);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
