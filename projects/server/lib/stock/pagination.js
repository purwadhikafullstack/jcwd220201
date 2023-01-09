const pagination = (page, limit) => {
  const LIMIT = limit ? limit : 10
  const OFFSET = page > 1 ? (page - 1) * LIMIT : 0

  return { LIMIT, OFFSET }
}

module.exports = pagination
