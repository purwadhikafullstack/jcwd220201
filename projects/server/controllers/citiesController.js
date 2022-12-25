const { readCityDB } = require("../db")

module.exports = {
  getAllCities: (req, res) => {
    const { province } = req.query

    const data = readCityDB().data

    if (province) {
      const result = data.filter((val) => {
        return val.province.toLowerCase() == province.toLowerCase()
      })

      return res.status(200).json({
        message: "Get All City Data",
        data: result,
      })
    }

    return res.status(200).json({
      message: "Get All City Data",
      data: data,
    })
  },
  getCityByID: (req, res) => {
    const { id } = req.params

    const data = readCityDB().data

    for (let city of data) {
      if (city.id == id) {
        return res.status(200).json({
          message: "Get City by ID",
          data: city,
        })
      }
    }

    return res.status(200).json({
      message: "City with ID " + id + " not found",
    })
  },
}
