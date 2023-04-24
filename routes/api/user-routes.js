const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const { validateUserBody } = require("../../utils/validate");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateUserBody(schemas.userAuthSchema),
  ctrl.register
);

router.post("/login", validateUserBody(schemas.userAuthSchema), ctrl.login);

module.exports = router;
