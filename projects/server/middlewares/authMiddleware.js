const { validToken } = require("../lib/jwt")

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "User is unauthorized",
    })
  }

  try {
    token = token.split(" ")[1]

    const userVerify = validToken(token)

    if (!userVerify) {
      return res.status(401).json({
        message: "unauthorized request",
      })
    }

    req.user = userVerify

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Token Error!",
    })
  }
}

module.exports = {
  verifyToken,
}
