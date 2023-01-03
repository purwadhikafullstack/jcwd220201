const fs = require("fs")

const readProvinceDB = () => {
  const provinceDBFile = fs
    .readFileSync(`${process.cwd()}/db/Province_Data.json`)
    .toString()

  const provinceDBObject = JSON.parse(provinceDBFile)

  return provinceDBObject
}

const readCityDB = () => {
  const cityDBFile = fs
    .readFileSync(`${process.cwd()}/db/City_Data.json`)
    .toString()

  const cityDBObject = JSON.parse(cityDBFile)

  return cityDBObject
}

module.exports = {
  readCityDB,
  readProvinceDB,
}
