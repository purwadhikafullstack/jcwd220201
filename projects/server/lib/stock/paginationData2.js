// Search By Product Name
const paginationData2 = (data, page, limit) => {
  const { count: totalProductStock, rows: ProductStock } = data
  const currentPage = page ? page : 1
  const totalPage = Math.ceil(totalProductStock / limit)

  return { totalProductStock, ProductStock, totalPage, currentPage }
}

module.exports = paginationData2
