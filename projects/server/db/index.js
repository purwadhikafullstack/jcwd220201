const fs = require("fs");
const path = require("path");

const readProvinceDB = () => {
  const provinceDBFile = fs
    .readFileSync(path.resolve(__dirname, "../db/Province_Data.JSON"))
    .toString();

  const provinceDBObject = JSON.parse(provinceDBFile);

  return provinceDBObject;
};

const readCityDB = () => {
  const cityDBFile = fs
    .readFileSync(`${process.cwd()}/db/City_Data.json`)
    .toString();

  const cityDBObject = JSON.parse(cityDBFile);

  return cityDBObject;
};

module.exports = {
  readCityDB,
  readProvinceDB,
};
