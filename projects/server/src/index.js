const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("../models");
const adminRoute = require("../routes/adminRoute");
const authRoute = require("../routes/authRoute");
const productsRoute = require("../routes/productsRoute");
const registerRoute = require("../routes/registerRoute");
const cartRoute = require("../routes/cartsRoute");
const addressRoute = require("../routes/addressRoute");
const productStockRoute = require("../routes/productStockRoute");
const checkoutRoute = require("../routes/checkoutRoute");
const userOrderRoute = require("../routes/userOrderRoute");

const PORT = process.env.PORT;

const app = express();
app.use(
  cors()
  // origin: [
  //   process.env.WHITELISTED_DOMAIN &&
  //     process.env.WHITELISTED_DOMAIN.split(","),
  // ],
);

app.use(express.json());
app.use("/api", express.static(path.join(__dirname, ".././public")));

//#region API ROUTES
//
// ===========================
// NOTE : Add your routes here

const productsAdminRoute = require("../routes/productsAdminRoute");
const warehouseUserRoute = require("../routes/warehouseUserRoute");
const reportProductRoute = require("../routes/reportProductRoute");

const paymentRoute = require("../routes/paymentRoute");
// Register middleware
app.use("/api/register", registerRoute);

// Address middleware
app.use("/api/address", addressRoute);

// Checkout middleware
app.use("/api/checkout", checkoutRoute);

const {
  warehousesRoute,
  citiesRoute,
  provincesRoute,
  categoriesRoute,
  adminUserRoute,
} = require("../routes");

app.use("api/warehouses", warehousesRoute);
app.use("api/cities", citiesRoute);
app.use("api/provinces", provincesRoute);
app.use("api/auth", authRoute);
app.use("api/admin", adminRoute);
app.use("api/products", productsRoute);
app.use("api/categories", categoriesRoute);
app.use("api/carts", cartRoute);
app.use("api/product-admin", productsAdminRoute);
app.use("api/warehouse-user", warehouseUserRoute);
app.use("api/sales", reportProductRoute);
app.use("api/admin/stock", productStockRoute);
app.use("api/payment", paymentRoute);
app.use("api/order/", userOrderRoute);
app.use("api/admin-user", adminUserRoute);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"))
// })

//#endregion

app.listen(PORT, async (err) => {
  db.sequelize.sync({ force: false });
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
