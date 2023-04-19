const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    } else if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  deleteContact,
};
