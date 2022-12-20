const { Address, sequelize } = require("../models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

// Own library imports
const getCoordinate = require("../lib/address/getCoordinate");
const getPagination = require("../lib/address/getPagination");
const getPagingData = require("../lib/address/getPagingData");

const addressController = {
  addNewAddress: async (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Data yang kamu masukkan tidak sesuai",
        });
      }

      // Get user id and new address
      const {
        id,
        newAddress: {
          recipient,
          phone,
          label,
          address,
          city,
          province,
          postalCode,
          isDefault,
        },
      } = req.body;

      // Reset default address if user specify a new default address
      if (isDefault === "true") {
        await sequelize.transaction(async (t) => {
          await Address.update(
            { is_default: false },
            {
              where: {
                [Op.and]: [{ UserId: id }, { is_default: true }],
              },
              transaction: t,
            }
          );
        });
      }

      // Get the coordinates of said address
      const pinpoint = await getCoordinate(postalCode);

      // Send error response in case of invalid coordinate
      if (!pinpoint) {
        return res.status(400).json({
          message: "Terjadi kesalahan, silakan coba lagi",
        });
      }

      // Persist user address in the Addresses table
      await sequelize.transaction(async (t) => {
        await Address.create(
          {
            UserId: id,
            recipient,
            phone,
            label,
            address,
            city,
            province,
            postal_code: postalCode,
            pinpoint,
            is_default: isDefault === "true",
          },
          { transaction: t }
        );
      });

      // Send success response
      return res.status(201).json({
        message: "Alamat berhasil ditambahkan",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  getAddresses: async (req, res) => {
    try {
      // Get user id
      const { id } = req.user;

      // Prepare for search and pagination feature
      const { search } = req.query;
      const searchPattern = search ? `%${search}%` : "%%";

      const page = parseInt(req.query.page);

      const { LIMIT, OFFSET } = getPagination(page);

      // Get addresses
      const addresses = await Address.findAndCountAll({
        where: {
          UserId: id,
          [Op.or]: [
            { address: { [Op.like]: searchPattern } },
            { recipient: { [Op.like]: searchPattern } },
          ],
        },
        limit: LIMIT,
        offset: OFFSET,
        order: [
          ["is_default", "DESC"],
          ["label", "ASC"],
        ],
      });

      // Format result
      const result = getPagingData(addresses, page, LIMIT);

      // Send successful response
      return res.status(200).json({
        message: "Daftar alamat berhasil diambil",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        message: "Server error",
      });
    }
  },
  makeDefaultAddress: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      // Get address id
      const { addressId: id } = req.body;

      // Update default address
      await sequelize.transaction(async (t) => {
        await Address.update(
          { is_default: false },
          {
            where: {
              [Op.and]: [{ UserId }, { is_default: true }],
            },
            transaction: t,
          }
        );
      });

      await sequelize.transaction(async (t) => {
        await Address.update(
          { is_default: true },
          {
            where: {
              [Op.and]: [{ id }, { UserId }],
            },
            transaction: t,
          }
        );
      });

      // Send successful response
      return res.status(200).json({
        message: "Alamat utama ditambahkan",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  editAddress: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;

      // Get new address details
      const {
        id,
        newAddress: {
          recipient,
          phone,
          label,
          address,
          city,
          province,
          postalCode,
          isDefault,
        },
      } = req.body;

      // Get the coordinates of said address
      const pinpoint = await getCoordinate(postalCode);

      // Send error response in case of invalid coordinate
      if (!pinpoint) {
        return res.status(400).json({
          message: "Pastikan kamu masukkan nama kota yang direkomendasikan",
        });
      }

      // Persist user address in the Addresses table
      await sequelize.transaction(async (t) => {
        await Address.update(
          {
            UserId,
            recipient,
            phone,
            label,
            address,
            city,
            province,
            postal_code: postalCode,
            pinpoint,
            is_default: isDefault,
          },
          {
            where: {
              id,
            },
            transaction: t,
          }
        );
      });

      // Send success response
      return res.status(201).json({
        message: "Alamat lengkap berhasil disimpan",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      // Get user id
      const { id: UserId } = req.user;
      const { addressId } = req.params;

      // Delete address
      await sequelize.transaction(async (t) => {
        await Address.destroy({
          where: {
            [Op.and]: [{ id: addressId }, { UserId }],
          },
          transaction: t,
        });
      });

      // Send successful message
      return res.status(200).json({
        message: "Alamat berhasil dihapus",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = addressController;
