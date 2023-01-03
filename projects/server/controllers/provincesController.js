const { readProvinceDB } = require("../db")

module.exports = {
  getAllProvinces: (req, res) => {
    const data = readProvinceDB().data

    return res.status(200).json({
      message: "Get All Province Data",
      data: data,
    })
  },
  getProvinceByID: (req, res) => {
    const { id } = req.params

    const data = readProvinceDB().data

    for (let province of data) {
      if (province.id == id) {
        return res.status(200).json({
          message: "Get Province by ID",
          data: province,
        })
      }
    }

    return res.status(200).json({
      message: "Province with ID " + id + " not found",
    })
  },
}
