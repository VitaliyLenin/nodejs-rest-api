const { Schema, model } = require("mongoose");

const joi = require("joi");

const handleMongooseError = require("../utils/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  phone: joi
    .string()
    .regex(/^[0-9 ()-]+$/)
    .required(),
});

const updateSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  phone: joi.string(),
});

const updateStatusSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateSchema,
  updateStatusSchema,
};

module.exports = {
  Contact,
  schemas,
};
