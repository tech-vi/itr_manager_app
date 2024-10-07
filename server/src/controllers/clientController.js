import Client from "../models/clientModel.js";

import { validateClient } from "../validators/clientValidator.js";

const addClient = async (req, res, next) => {
  const { error, value } = validateClient(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const {
    pan_number,
    client_name,
    mobile_number,
    password,
    financial_year,
    assessment_year,
    itr_form_type,
    itr_form_status,
    fee_status,
    revised,
  } = value;

  try {
    const addedBy = req.user._id;

    const clientExists = await Client.findOne({
      pan_number,
      financial_year,
    });

    if (clientExists) {
      res.status(400);
      const err = new Error("Client already exists.!");
      return next(err);
    }
    const client = await Client.create({
      pan_number,
      client_name: client_name.toUpperCase(),
      mobile_number,
      password,
      financial_year,
      assessment_year,
      itr_form_type,
      itr_form_status,
      fee_status,
      revised,
      added_by: addedBy,
    });

    if (client) {
      res.status(201).json({ message: "New client added.!" });
    } else {
      res.status(500);
      const err = new Error("Failed to add client.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const editClient = async (req, res, next) => {
  const { cid } = req.params;

  const { error, value } = validateClient(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const {
    pan_number,
    client_name,
    mobile_number,
    password,
    financial_year,
    assessment_year,
    itr_form_type,
    itr_form_status,
    fee_status,
    revised,
  } = value;

  try {
    const editedBy = req.user._id;

    const client = await Client.findById(cid);

    if (!client) {
      res.status(404);
      const err = new Error("Client not found.!");
      return next(err);
    }

    const clientExists = await Client.findOne({
      pan_number,
      financial_year,
      _id: { $ne: cid },
    });

    if (clientExists) {
      res.status(400);
      const err = new Error("Client already exists.!");
      return next(err);
    }

    client.pan_number = pan_number ?? client.pan_number;
    client.client_name = client_name.toUpperCase() ?? client.client_name;
    client.mobile_number = mobile_number ?? client.mobile_number;
    client.password = password ?? client.password;
    client.financial_year = financial_year ?? client.financial_year;
    client.assessment_year = assessment_year ?? client.assessment_year;
    client.itr_form_type = itr_form_type ?? client.itr_form_type;
    client.itr_form_status = itr_form_status ?? client.itr_form_status;
    client.fee_status = fee_status ?? client.fee_status;
    client.revised = revised ?? client.revised;
    client.edited_by = editedBy ?? client.edited_by;

    const updatedClient = await client.save();

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getClient = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const client = await Client.findById(cid);

    if (!client) {
      res.status(404);
      const err = new Error("Client not found.!");
      return next(err);
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const removeClient = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const client = await Client.findById(cid);

    if (!client) {
      res.status(404);
      const err = new Error("Client not found.!");
      return next(err);
    }

    const deleted = await Client.deleteOne({ _id: cid });

    if (deleted) {
      res.status(200).json({ message: "Client removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({})
      .populate("financial_year", "title")
      .populate("fee_status", "title")
      .populate("itr_form_type", "title")
      .populate("itr_form_status", "title")
      .populate("added_by", "fname lname")
      .populate("edited_by", "fname lname")
      .sort({ updatedAt: -1 });

    res.status(200).json(clients || []);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export { addClient, getClient, editClient, removeClient, getClients };
