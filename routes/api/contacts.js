const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/controllers");

const { schemas } = require("../../models/contact");
const { validateBody } = require("../../utils/validate");

router.get("/", ctrl.getContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.updateSchema), ctrl.updateContact);
router.patch(
  "/:id/favorite",
  validateBody(schemas.updateStatusSchema),
  ctrl.updateFavorite
);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
