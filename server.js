const express = require("express");
const dotenv = require("dotenv");
const { initDb } = require("./data/database");
const carRoutes = require("./routes/cars");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const maintenanceRoutes = require("./routes/maintenance");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRoutes);

app.use("/cars", carRoutes);

app.use("/maintenance", maintenanceRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Car Collection API");
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})

.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});