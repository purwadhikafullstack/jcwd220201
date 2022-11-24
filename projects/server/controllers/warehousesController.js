const db = require("../models")
const axios = require("axios")
const dotenv = require("dotenv")

const Warehouse = db.Warehouse

module.exports = {
  createWarehouse: async (req, res) => {
    try {
      const { warehouse_name, address, province, city } = req.body

      const uriEncodedAddress = encodeURI(
        `${address}, ${city}, ${province}, Indonesia`
      )

      const pointResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${process.env.OPENCAGE_API_KEY}&q=${uriEncodedAddress}&pretty=1`
      )

      const pointString = JSON.stringify(pointResponse.data.results[0].geometry)

      const newWarehouse = await Warehouse.create({
        warehouse_name: warehouse_name,
        pinpoint: pointString,
        address: address,
        province: province,
        city: city,
      })

      return res.status(201).json({
        message: "Warehouse Data Created",
        data: newWarehouse,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getAllWarehouses: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllWarehouse = await Warehouse.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["id", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Warehouses Data",
        data: findAllWarehouse.rows,
        dataCount: findAllWarehouse.count,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getWarehouseById: async (req, res) => {
    try {
      const { id } = req.params

      const warehouseById = await Warehouse.findOne({
        where: {
          id,
        },
      })

      if (!warehouseById) {
        return res.status(400).json({
          message: "Warehouse not found",
        })
      }

      return res.status(200).json({
        message: "Get Warehouses Data by ID",
        data: warehouseById,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  updateWarehouseById: async (req, res) => {
    try {
      const { id } = req.params

      await Warehouse.update({ ...req.body }, { where: { id: id } })

      const warehouseById = await Warehouse.findOne({
        where: {
          id: id,
        },
      })

      const uriEncodedAddress = encodeURI(
        `${warehouseById.address}, ${warehouseById.city}, ${warehouseById.province}, Indonesia`
      )

      const pointResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${process.env.OPENCAGE_API_KEY}&q=${uriEncodedAddress}&pretty=1`
      )

      const pointString = JSON.stringify(pointResponse.data.results[0].geometry)

      await Warehouse.update({ pinpoint: pointString }, { where: { id: id } })

      return res.status(200).json({
        message: "Warehouses Data Updated",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  deleteWarehouseById: async (req, res) => {
    try {
      const { id } = req.params

      const warehouseById = await Warehouse.findOne({
        where: {
          id,
        },
      })

      if (!warehouseById) {
        return res.status(400).json({
          message: "Warehouse not found",
        })
      }

      await Warehouse.destroy({
        where: {
          id,
        },
      })

      return res.status(200).json({
        message: "Warehouses Data Deleted",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}
