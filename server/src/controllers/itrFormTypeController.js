import ITRFormType from "../models/itrFormTypeModel.js";

import { validateITRFormType } from "../validators/validator.js";

const createITRFormType = async (req, res, next) => {
  const { error, value } = validateITRFormType(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  try {
    const itrFormTypeExists = await ITRFormType.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });

    if (itrFormTypeExists) {
      res.status(400);
      const err = new Error("ITR form type already exists.!");
      return next(err);
    }
    const itrFormType = await ITRFormType.create({
      title: title.trim().toUpperCase(),
    });

    if (itrFormType) {
      res.status(201).json({ message: "New ITR form type added.!" });
    } else {
      res.status(500);
      const err = new Error("Failed to create ITR form type.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const updateITRFormType = async (req, res, next) => {
  const { error, value } = validateITRFormType(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  const { id } = req.params;

  try {
    const itrFormType = await ITRFormType.findById(id);

    if (!itrFormType) {
      res.status(404);
      const err = new Error("ITR form type not found.!");
      return next(err);
    }

    const itrFormTypeExists = await ITRFormType.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (itrFormTypeExists) {
      res.status(400);
      const err = new Error("ITR form type already exists.!");
      return next(err);
    }

    itrFormType.title = title.trim().toUpperCase() || itrFormType.title;

    const updatedITRFormType = await itrFormType.save();

    res.status(200).json(updatedITRFormType);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const deleteITRFormType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itrFormType = await ITRFormType.findById(id);

    if (!itrFormType) {
      res.status(404);
      const err = new Error("ITR form type not found.!");
      return next(err);
    }

    const deleted = await ITRFormType.deleteOne({ _id: id });

    if (deleted) {
      res.status(200).json({ message: "ITR form type removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getITRFormType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itrFormType = await ITRFormType.findById(id);

    if (!itrFormType) {
      res.status(404);
      const err = new Error("ITR form type not found.!");
      return next(err);
    }

    res.status(200).json(itrFormType);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getITRFormTypes = async (req, res, next) => {
  try {
    const itrFormTypes = await ITRFormType.find({});
    if (!itrFormTypes) {
      res.status(404);
      const err = new Error("No ITR form types found.!");
      return next(err);
    }
    res.status(200).json(itrFormTypes);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export {
  createITRFormType,
  updateITRFormType,
  deleteITRFormType,
  getITRFormType,
  getITRFormTypes,
};
