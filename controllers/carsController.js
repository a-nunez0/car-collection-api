const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const validateCar = (car) => {
  if (
    !car.make ||
    !car.model ||
    !car.year ||
    !car.color ||
    !car.price ||
    !car.mileage ||
    !car.fuelType ||
    !car.condition
  ) {
    return false;
  }
  return true;
};

const getAllCars = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("cars").find();
    const cars = await result.toArray();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleCar = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection("cars").find({ _id: carId });
    const car = await result.toArray();

    if (car.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car[0]);
  } catch (err) {
    res.status(400).json({ message: "Invalid car ID" });
  }
};

const createCar = async (req, res) => {
  try {
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      mileage: req.body.mileage,
      fuelType: req.body.fuelType,
      condition: req.body.condition
    };

    if (!validateCar(car)) {
      return res.status(400).json({ message: "Please provide all required car fields." });
    }

    const response = await mongodb.getDb().collection("cars").insertOne(car);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);

    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      mileage: req.body.mileage,
      fuelType: req.body.fuelType,
      condition: req.body.condition
    };

    if (!validateCar(car)) {
      return res.status(400).json({ message: "Please provide all required car fields." });
    }

    const response = await mongodb.getDb().collection("cars").replaceOne({ _id: carId }, car);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid car ID" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection("cars").deleteOne({ _id: carId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: "Invalid car ID" });
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar
};