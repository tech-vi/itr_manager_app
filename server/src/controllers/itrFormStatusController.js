import ITRFormStatus from "../models/itrFormStatusModel.js";

import { validateITRFormStatus } from "../validators/validator.js";

const createITRFormStatus = async (req, res, next) => {
  const { error, value } = validateITRFormStatus(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  try {
    const itrFormStatusExists = await ITRFormStatus.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });

    if (itrFormStatusExists) {
      res.status(400);
      const err = new Error("ITR form status already exists.!");
      return next(err);
    }
    const itrFormStatus = await ITRFormStatus.create({
      title: title.trim().toUpperCase(),
    });

    if (itrFormStatus) {
      res.status(201).json({ message: "New ITR form status added.!" });
    } else {
      res.status(500);
      const err = new Error("Failed to create ITR form status.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const updateITRFormStatus = async (req, res, next) => {
  const { error, value } = validateITRFormStatus(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  const { id } = req.params;

  try {
    const itrFormStatus = await ITRFormStatus.findById(id);

    if (!itrFormStatus) {
      res.status(404);
      const err = new Error("ITR form status not found.!");
      return next(err);
    }

    const itrFormStatusExists = await ITRFormStatus.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (itrFormStatusExists) {
      res.status(400);
      const err = new Error("ITR form status already exists.!");
      return next(err);
    }

    itrFormStatus.title = title.trim().toUpperCase() || itrFormStatus.title;

    const updatedITRFormStatus = await itrFormStatus.save();

    res.status(200).json(updatedITRFormStatus);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const deleteITRFormStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itrFormStatus = await ITRFormStatus.findById(id);

    if (!itrFormStatus) {
      res.status(404);
      const err = new Error("ITR form status not found.!");
      return next(err);
    }

    const deleted = await ITRFormStatus.deleteOne({ _id: id });

    if (deleted) {
      res.status(200).json({ message: "ITR form status removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getITRFormStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itrFormStatus = await ITRFormStatus.findById(id);

    if (!itrFormStatus) {
      res.status(404);
      const err = new Error("ITR form status not found.!");
      return next(err);
    }

    res.status(200).json(itrFormStatus);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getITRFormStatuses = async (req, res, next) => {
  try {
    const itrFormStatuses = await ITRFormStatus.find({});
    if (!itrFormStatuses) {
      res.status(404);
      const err = new Error("No ITR form status found.!");
      return next(err);
    }
    res.status(200).json(itrFormStatuses);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export {
  createITRFormStatus,
  updateITRFormStatus,
  getITRFormStatus,
  getITRFormStatuses,
  deleteITRFormStatus,
};
