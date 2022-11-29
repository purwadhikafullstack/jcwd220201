const db = require("../models")
const { Op } = require("sequelize")
// const bcrypt = require("bcrypt") later merge with others

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { nameOrEmail, password } = req.body

      const findUserAdmin = await db.User.findOne({
        where: {
          [Op.or]: {
            name: nameOrEmail,
            email: nameOrEmail,
            password: password,
          },
        },
      })
      if (findUserAdmin.role_id == 3 || findUserAdmin.is_verified == false) {
        return res.status(400).json({
          msg: "User Unauthorized !",
        })
      }

      // later use this to compare hashed password

      // const validatePassword = bcrypt.compareSync(
      //   password,
      //   findUserAdmin.password
      // )

      if (!findUserAdmin.role_id == 1 || !findUserAdmin.role_id == 2) {
        return res.status(400).json({
          msg: "Role Admin Not Found ❌",
        })
      }

      return res.status(201).json({
        msg: "Admin Logged in ✅",
        data: findUserAdmin,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: "Server Error !" })
    }
  },
}

module.exports = adminController
