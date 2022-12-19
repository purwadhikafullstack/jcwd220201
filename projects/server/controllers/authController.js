const db = require("../models")
const bcrypt = require("bcrypt")
const { signToken } = require("../lib/jwt")
const { Op } = require("sequelize")

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
          message: "Email or Password not found",
        })
      }

      const passwordValid = bcrypt.compareSync(
        password,
        findUserByEmail.password
      )

      if (!passwordValid) {
        return res.status(400).json({
          message: "Password invalid",
        })
      }

      delete findUserByEmail.dataValues.password

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

  editUserProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = `http://localhost:8000/public/${req.file.filename}`
      }
      const { password } = req.body

      // edit with hashed password
      const hashedPassword = bcrypt.hashSync(password, 5)

      await User.update(
        { password: hashedPassword },
        {
          where: {
            id: req.user.id,
          },
        }
      )

      const findUserById = await User.findByPk(req.user.id)

      return res.status(200).json({
        message: "Edited user data",
        data: findUserById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  editUserPassword: async (req, res) => {
    try {
      const { password } = req.body

      const hashedPassword = bcrypt.hashSync(password, 5)

      await User.update(
        { password: hashedPassword },
        {
          where: {
            id: req.user.id,
          },
        }
      )

      const findUserById = await User.findByPk(req.user.id)

      return res.status(200).json({
        message: "Edited user data",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getUserById: async (req, res) => {
    try {
      const findUserById = await db.User.findOne({
        while: {
          id: req.params.id,
        },
      })

      return res.status(200).json({
        message: "Get user By ID",
        data: findUserById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getAllUser: async (req, res) => {
    try {
      const findAllUser = await db.User.findAll({
        where: {
          ...req.query,
        },
      })
      return res.status(200).json({
        message: "Get All User",
        data: findAllUser,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
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
