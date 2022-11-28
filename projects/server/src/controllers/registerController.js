const { validationResult, Result } = require("express-validator");
const handlebars = require("handlebars");
const fs = require("fs");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const moment = require("moment");

// Own library imports
const { User, Otp, sequelize } = require("../../models");
const emailer = require("../../lib/emailer");

const registerController = {
  duplicateCheck: async (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Format email salah", errors: errors.array() });
      }
      // Check for duplicate email address
      const { email } = req.body;
      const existingUser = await User.findOne({
        where: {
          email,
          is_verified: true,
        },
      });
      // Send error response if duplicate is found
      if (existingUser) {
        return res.status(400).json({
          message: "Email sudah terdaftar",
        });
      }
      // Send success response if duplicate not found
      return res.status(200).json({
        message: "Email belum terdaftar",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  register: async (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Format email salah", errors: errors.array() });
      }
      // Create user data
      const { email } = req.body;

      let user = null;
      const existingUser = await User.findOne({
        where: {
          email,
          is_verified: null,
        },
      });

      if (existingUser) {
        user = existingUser;
      } else {
        const result = await sequelize.transaction(async (t) => {
          user = await User.create(
            {
              email,
            },
            { transaction: t }
          );
        });
      }

      // Generate OTP
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      // Persist sent OTP
      const userReceivedOtp = await Otp.findOne({
        where: {
          user_id: user.id,
        },
      });

      if (userReceivedOtp) {
        await Otp.update(
          { otp },
          {
            where: {
              user_id: user.id,
            },
          }
        );
      } else {
        await Otp.create({
          user_id: user.id,
          otp,
        });
      }

      // Send verification email
      const file = fs.readFileSync(
        "./templates/verification/email_verification.html",
        "utf-8"
      );
      const template = handlebars.compile(file);
      const verificationEmail = template({ email, otp });
      await emailer({
        to: email,
        subject: "Aktivasi Akun Wired!",
        html: verificationEmail,
      });

      // Send successful response
      return res.status(201).json({
        message: "Email berhasil didaftarkan",
        data: user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  requestOtp: async (req, res) => {
    try {
      // Get user data
      const { email } = req.body;

      const user = await User.findOne({
        where: {
          email,
          is_verified: null,
        },
        attributes: ["id"],
      });

      // Generate OTP
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      // Persist sent OTP
      const result = await sequelize.transaction(async (t) => {
        const update = await Otp.update(
          { otp },
          {
            where: {
              user_id: user.id,
            },
            transaction: t,
          }
        );
      });

      // Send new verification email
      const file = fs.readFileSync(
        "./templates/verification/email_verification.html",
        "utf-8"
      );
      const template = handlebars.compile(file);
      const verificationEmail = template({ email, otp });
      await emailer({
        to: email,
        subject: "Aktivasi Akun Wired!",
        html: verificationEmail,
      });

      // Send successful response
      return res.status(200).json({
        message: "Kode OTP berhasil dikirimkan",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  validateOtp: async (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Kode yang kamu masukkan salah",
          errors: errors.array(),
        });
      }

      // Get user data and issued OTP
      const { email, otp } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
        attributes: ["id"],
      });

      const issuedOtp = await Otp.findOne({
        where: {
          user_id: user.id,
        },
      });

      // Get time difference
      const currentDate = moment();
      const issuedDate = moment(issuedOtp.issued_at);
      const timeDiff = moment
        .duration(currentDate.diff(issuedDate))
        .as("minutes");
      const maxDuration = 30;

      console.log(issuedOtp.otp);

      // Validate OTP
      if (otp !== issuedOtp.otp) {
        return res.status(401).json({
          message: "Kode yang kamu masukkan salah.",
        });
      } else if (timeDiff > maxDuration) {
        return res.status(401).json({
          message: "Kode yang kamu masukkan tidak berlaku.",
        });
      }

      if (otp === issuedOtp.otp) {
        // Delete OTP
        await Otp.destroy({
          where: {
            id: issuedOtp.id,
          },
        });
      }

      // Send successful response
      return res.status(202).json({
        message: "Kode yang kamu masukkan benar.",
        data: user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  completeRegistration: async (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Update user credentials
      const { name, email, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);
      await User.update(
        { name, password: hash, is_verified: true },
        {
          where: {
            email,
          },
        }
      );
      // Send success response
      return res.status(201).json({
        message: "Akun berhasil didaftarkan",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = registerController;
