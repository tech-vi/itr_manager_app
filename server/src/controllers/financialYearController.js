import FinancialYear from "../models/financialYearModel.js";

import { validateFinancialYear } from "../validators/validator.js";

const createFinancialYear = async (req, res, next) => {
  const { error, value } = validateFinancialYear(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  try {
    const financialYearExists = await FinancialYear.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });

    if (financialYearExists) {
      res.status(400);
      const err = new Error("Financial year already exists.!");
      return next(err);
    }
    const financialYear = await FinancialYear.create({
      title: title.trim().toUpperCase(),
    });

    if (financialYear) {
      res.status(201).json({ message: "New financial year added.!" });
    } else {
      res.status(500);
      const err = new Error("Failed to create financial year.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const updateFinancialYear = async (req, res, next) => {
  const { error, value } = validateFinancialYear(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { title } = value;

  const { id } = req.params;

  try {
    const financialYear = await FinancialYear.findById(id);

    if (!financialYear) {
      res.status(404);
      const err = new Error("Financial year not found.!");
      return next(err);
    }

    const financialYearExists = await FinancialYear.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (financialYearExists) {
      res.status(400);
      const err = new Error("Financial year already exists.!");
      return next(err);
    }

    financialYear.title = title.trim().toUpperCase() || financialYear.title;

    const updatedFinancialYear = await financialYear.save();

    res.status(200).json(updatedFinancialYear);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const deleteFinancialYear = async (req, res, next) => {
  const { id } = req.params;

  try {
    const financialYear = await FinancialYear.findById(id);

    if (!financialYear) {
      res.status(404);
      const err = new Error("Financial year not found.!");
      return next(err);
    }

    const deleted = await FinancialYear.deleteOne({ _id: id });

    if (deleted) {
      res.status(200).json({ message: "Financial year removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getFinancialYear = async (req, res, next) => {
  const { id } = req.params;

  try {
    const financialYear = await FinancialYear.findById(id);

    if (!financialYear) {
      res.status(404);
      const err = new Error("Financial year not found.!");
      return next(err);
    }

    res.status(200).json(financialYear);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getFinancialYears = async (req, res, next) => {
  try {
    const financialYears = await FinancialYear.find({});
    if (!financialYears) {
      res.status(404);
      const err = new Error("No financial year found.!");
      return next(err);
    }
    res.status(200).json(financialYears);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export {
  createFinancialYear,
  updateFinancialYear,
  getFinancialYear,
  getFinancialYears,
  deleteFinancialYear,
};
