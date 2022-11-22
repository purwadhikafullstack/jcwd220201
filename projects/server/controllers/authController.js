const db = require("../models")
// const bcrypt = require("bcrypt");
const { signToken } = require("../lib/jwt")

const User = db.User

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body

      const findUserByEmail = await User.findOne({
        where: {
          email,
        },
      })
      if (!findUserByEmail) {
        return res.status(400).json({
          message: "Email not found",
        })
      }

      // const passwordValid = bcrypt.compareSync(
      //   password,
      //   findUserByEmail.password
      // );

      // if (!passwordValid) {
      //   return res.status(400).json({
      //     message: "Password invalid",
      //   });
      // }

      // Hapus property password dari object yang akan dikirim
      // sebagai response
      // delete findUserByEmail.dataValues.password;

      const token = signToken({
        id: findUserByEmail.id,
      })

      return res.status(201).json({
        message: "Login User",
        data: findUserByEmail,
        token,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
  // adminLogin: async (req, res) => {
  //   try {
  //     const { nameOrEmail, password } = req.body

  //     const findUserAdmin = await db.User.findOne({
  //       where: {
  //         [Op.or]: {
  //           name: nameOrEmail,
  //           email: nameOrEmail,
  //           password: password,
  //         },
  //       },
  //     })
  //     if (findUserAdmin.role_id == 3 || findUserAdmin.is_verified == false) {
  //       return res.status(400).json({
  //         msg: "User Unauthorized !",
  //       })
  //     }

  //     // later use this to compare hashed password

  //     // const validatePassword = bcrypt.compareSync(
  //     //   password,
  //     //   findUserAdmin.password
  //     // )

  //     if (!findUserAdmin.role_id == 1 || !findUserAdmin.role_id == 2) {
  //       return res.status(400).json({
  //         msg: "Role Admin Not Found ❌",
  //       })
  //     }

  //     return res.status(201).json({
  //       msg: "Admin Logged in ✅",
  //       data: findUserAdmin,
  //     })
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(500).json({ msg: "Server Error !" })
  //   }
  // },
}

module.exports = authController
