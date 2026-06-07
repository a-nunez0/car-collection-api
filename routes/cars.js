const express = require("express");
const router = express.Router();

const carsController = require("../controllers/carsController");

function isLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }

  return res.status(401).json({
    message: "You must be logged in to access this route"
  });
}

router.get("/", carsController.getAllCars);

router.get("/:id", carsController.getSingleCar);

router.post("/", isLoggedIn, carsController.createCar);

router.put("/:id", isLoggedIn, carsController.updateCar);

router.delete("/:id", isLoggedIn, carsController.deleteCar);

module.exports = router;