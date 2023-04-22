const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

const validateContactStatus = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};

const validateAddContact = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const fieldName = error.details.map((detail) => detail.context.key);
      const message = `Missing required ${fieldName.join(", ")} ${
        fieldName.length === 1 ? "field" : "fields"
      }`;
      next(HttpError(400, message));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
  validateContactStatus,
  validateAddContact,
};
