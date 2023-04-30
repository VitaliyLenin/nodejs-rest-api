const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/controllers");

const { schemas } = require("../../models/contact");
const {
  validateBody,
  validateContactStatus,
  validateAddContact,
} = require("../../utils/validate");

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.getContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateAddContact(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateContactStatus(schemas.updateStatusSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
