const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const validateMaintenance = (record) => {
  if (
    !record.carId ||
    !record.serviceType ||
    !record.serviceDate ||
    !record.cost ||
    !record.shopName
  ) {
    return false;
  }
  return true;
};

const getAllMaintenance = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("maintenance").find();
    const records = await result.toArray();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleMaintenance = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("maintenance").find({ _id: recordId });
    const record = await result.toArray();

    if (record.length === 0) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.status(200).json(record[0]);
  } catch (err) {
    res.status(400).json({ message: "Invalid maintenance ID" });
  }
};

const createMaintenance = async (req, res) => {
  try {
    const record = {
      carId: req.body.carId,
      serviceType: req.body.serviceType,
      serviceDate: req.body.serviceDate,
      cost: req.body.cost,
      shopName: req.body.shopName,
      notes: req.body.notes || ""
    };

    if (!validateMaintenance(record)) {
      return res.status(400).json({ message: "Please provide all required maintenance fields." });
    }

    const response = await mongodb.getDb().collection("maintenance").insertOne(record);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMaintenance = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);

    const record = {
      carId: req.body.carId,
      serviceType: req.body.serviceType,
      serviceDate: req.body.serviceDate,
      cost: req.body.cost,
      shopName: req.body.shopName,
      notes: req.body.notes || ""
    };

    if (!validateMaintenance(record)) {
      return res.status(400).json({ message: "Please provide all required maintenance fields." });
    }

    const response = await mongodb
      .getDb()
      .collection("maintenance")
      .replaceOne({ _id: recordId }, record);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid maintenance ID" });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection("maintenance")
      .deleteOne({ _id: recordId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: "Invalid maintenance ID" });
  }
};

module.exports = {
  getAllMaintenance,
  getSingleMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance
};
