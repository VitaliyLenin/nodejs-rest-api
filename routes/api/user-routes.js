const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const { validateUserBody } = require("../../utils/validate");

const { schemas } = require("../../models/user");

const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post(
  "/register",
  validateUserBody(schemas.userAuthSchema),
  ctrl.register
);

router.post("/login", validateUserBody(schemas.userAuthSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
