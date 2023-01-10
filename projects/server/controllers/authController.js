const db = require("../models")
const bcrypt = require("bcrypt")
const { signToken, decode } = require("../lib/jwt")
const { Op } = require("sequelize")
const emailer = require("../lib/emailer")
const fs = require("fs")
const handlebars = require("handlebars")

const User = db.User

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body

      const findUserByEmail = await User.findOne({
        where: {
          email,
        },

        include: [{ model: db.WarehousesUser, attributes: ["WarehouseId"] }],
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
        message: err.message,
      })
    }
  },

  editUserProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = `${process.env.SERVER_URL}/public/${req.file.filename}`
      }

      await User.update(
        {
          name: req.body.name,
          gender: req.body.gender,
          phone: req.body.phone,
          date_of_birth: req.body.date_of_birth,
          profile_picture: req.body.profile_picture,
        },
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
        message: err.message,
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
        data: findUserById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
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
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body

      const findUser = await db.User.findOne({
        where: { email: email },
      })

      if (!findUser) {
        return res.status(400).json({
          message: "email tidak tersedia",
        })
      }

      const token = signToken({
        id: findUser.id,
      })

      const resetLink = `${process.env.DOMAIN_NAME}/recover-password/${token}`

      const file = fs.readFileSync(
        "./templates/password/reset_password.html",
        "utf-8"
      )
      const template = handlebars.compile(file)
      // const ResetEmail = template({ email })

      const htmlResult = template({
        email,
        resetLink,
      })
      await emailer({
        to: email,
        subject: "Link Reset Password",
        html: htmlResult,
        text: "setting new password",
      })

      return res.status(200).json({
        message: " Your request reset password has been sent",
        data: findUser,
        token: token,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  recoverPassword: async (req, res) => {
    try {
      const token = req.header("authorization").split(" ")[1]

      const decodeToken = decode(token)

      if (!decodeToken) {
        return res.status(400).json({
          message: "Unauthorized request",
        })
      }

      const findUser = await db.User.findOne({
        where: {
          id: decodeToken.id,
        },
      })
      const hashedPassword = bcrypt.hashSync(req.body.password, 5)

      const updatePassword = await db.User.update(
        {
          password: hashedPassword,
        },
        {
          where: { id: findUser.id },
        }
      )

      if (updatePassword[0] === 0) {
        throw new Error("Update password failed")
      }
      return res.status(200).json({
        message: "Password Successfully changed!",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = authController
