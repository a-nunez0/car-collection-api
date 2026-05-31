const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const validateMaintenance = (record) => {
  if (
    !record.carId ||
    !record.serviceType ||
    !record.serviceDate ||
    record.cost === undefined ||
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
      const id = req.params.id;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      // First, search by maintenance record ID
      const record = await mongodb
        .getDb()
        .collection("maintenance")
        .findOne({ _id: new ObjectId(id) });
  
      if (record) {
        return res.status(200).json(record);
      }
  
      // If no maintenance record found, search by carId
      const recordsByCar = await mongodb
        .getDb()
        .collection("maintenance")
        .find({ carId: id })
        .toArray();
  
      if (recordsByCar.length === 0) {
        return res.status(404).json({
          message: "No maintenance record found with that maintenance ID or car ID"
        });
      }
  
      res.status(200).json(recordsByCar);
    } catch (err) {
      res.status(500).json({ message: err.message });
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

    // Make sure carId is a real MongoDB id
    if (!ObjectId.isValid(record.carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    // Check if the car exists
    const car = await mongodb
      .getDb()
      .collection("cars")
      .findOne({ _id: new ObjectId(record.carId) });

    if (!car) {
      return res.status(404).json({ message: "Car not found. Maintenance must belong to a real car." });
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

    if (!ObjectId.isValid(record.carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    // Check if the car exists
    const car = await mongodb
      .getDb()
      .collection("cars")
      .findOne({ _id: new ObjectId(record.carId) });

    if (!car) {
      return res.status(404).json({ message: "Car not found. Maintenance must belong to a real car." });
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
