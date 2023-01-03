const express = require("express");
const { body } = require("express-validator");
const {
  addNewAddress,
  getAddresses,
  makeDefaultAddress,
  editAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  body("id").not().isEmpty(),
  body("newAddress.recipient").not().isEmpty().trim(),
  body("newAddress.phone")
    .not()
    .isEmpty()
    .trim()
    .customSanitizer((value) => value.replace(/^[1-9]\d{9,11}$/, `0${value}`)),
  body("newAddress.label").not().isEmpty().trim(),
  body("newAddress.city").not().isEmpty().trim(),
  body("newAddress.province").not().isEmpty().trim(),
  body("newAddress.postalCode").not().isEmpty().trim(),
  body("newAddress.address").not().isEmpty().trim(),
  body("newAddress.isDefault").not().isEmpty().trim(),
  addNewAddress
);

router.get("/", verifyToken, getAddresses);

router.patch("/default", verifyToken, makeDefaultAddress);

router.patch("/", verifyToken, editAddress);

router.delete("/:addressId", verifyToken, deleteAddress);

module.exports = router;
