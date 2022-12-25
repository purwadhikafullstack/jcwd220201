const getPagingData = (data, page, limit) => {
  const { count: totalAddress, rows: addresses } = data;
  const currentPage = page ? page : 1;
  const totalPage = Math.ceil(totalAddress / limit);

  return { totalAddress, addresses, totalPage, currentPage };
};

module.exports = getPagingData;
