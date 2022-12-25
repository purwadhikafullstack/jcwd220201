const express = require("express");

// Own library imports
const {
  getAddresses,
  selectAddress,
  findNearestWarehouse,
  getCartItems,
  getDestinationInfo,
  getShippingMethod,
  getCouriers,
  createOrder,
} = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAddresses);
router.get("/nearest_warehouse", verifyToken, findNearestWarehouse);
router.get("/cart", verifyToken, getCartItems);
router.get("/couriers", verifyToken, getCouriers);
router.post("/shipping_method", verifyToken, getShippingMethod);
router.post("/shipping_address", verifyToken, getDestinationInfo);
router.patch("/address", verifyToken, selectAddress);
router.post("/order", verifyToken, createOrder);

module.exports = router;
