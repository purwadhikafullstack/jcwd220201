// Search By Warehouse Name
const paginationData = (data, page, limit) => {
  const { count: totalWarehouse, rows: Warehouse } = data
  const currentPage = page ? page : 1
  const totalPage = Math.ceil(totalWarehouse / limit)

  return { totalWarehouse, Warehouse, totalPage, currentPage }
}

module.exports = paginationData
