const db = require("../models");
const bcrypt = require("bcrypt");
const { signToken } = require("../lib/jwt");

const User = db.User;

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUserByEmail) {
        return res.status(400).json({
          message: "Email not found",
        });
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
      });

      return res.status(201).json({
        message: "Login User",
        data: findUserByEmail,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id);

      const renewedToken = signToken({
        id: req.user.id,
      });

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = authController;
