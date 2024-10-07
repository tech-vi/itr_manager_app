import FeeStatus from "../models/feeStatusModel.js";

import { validateFeeStatus } from "../validators/validator.js";

const createFeeStatus = async (req, res, next) => {
  const { error, value } = validateFeeStatus(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  try {
    const feeStatusExists = await FeeStatus.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });

    if (feeStatusExists) {
      res.status(400);
      const err = new Error("Fee status already exists.!");
      return next(err);
    }
    const feeStatus = await FeeStatus.create({
      title: title.trim().toUpperCase(),
    });

    if (feeStatus) {
      res.status(201).json({ message: "New fee status added.!" });
    } else {
      res.status(500);
      const err = new Error("Failed to create fee status.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const updateFeeStatus = async (req, res, next) => {
  const { error, value } = validateFeeStatus(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;
  console.log(title);

  const { id } = req.params;
  console.log(id);

  try {
    const feeStatus = await FeeStatus.findById(id);
    console.log(feeStatus);

    if (!feeStatus) {
      res.status(404);
      const err = new Error("Fee Status not found.!");
      return next(err);
    }

    const feeStatusExists = await FeeStatus.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (feeStatusExists) {
      res.status(400);
      const err = new Error("Fee status already exists.!");
      return next(err);
    }

    feeStatus.title = title.trim().toUpperCase() || feeStatus.title;

    const updatedFeeStatus = await feeStatus.save();

    res.status(200).json(updatedFeeStatus);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.");
    return next(err);
  }
};

const deleteFeeStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const feeStatus = await FeeStatus.findById(id);

    if (!feeStatus) {
      res.status(404);
      const err = new Error("Fee status not found.!");
      return next(err);
    }

    const deleted = await FeeStatus.deleteOne({ _id: id });

    if (deleted) {
      res.status(200).json({ message: "Fee status removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getFeeStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const feeStatus = await FeeStatus.findById(id);

    if (!feeStatus) {
      res.status(404);
      const err = new Error("Fee status not found.!");
      return next(err);
    }

    res.status(200).json(feeStatus);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getFeeStatuses = async (req, res, next) => {
  try {
    const feeStatuses = await FeeStatus.find({});
    if (!feeStatuses) {
      res.status(404);
      const err = new Error("No fee status found.!");
      return next(err);
    }
    res.status(200).json(feeStatuses);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export {
  createFeeStatus,
  updateFeeStatus,
  getFeeStatus,
  getFeeStatuses,
  deleteFeeStatus,
};
