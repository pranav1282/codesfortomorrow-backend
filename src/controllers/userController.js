const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "InterviewSecretKet";

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // const existingUser = await User.findOne({ email: email });
    
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const result = await User.create(user);
    const token = jwt.sign(
      {
        email: result.email,
        // id: result._id,
        id: result.id,
      },
      SECRET_KEY
    );
    res.status(201).json({
      user: result,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const existingUser = await User.findOne({ email: email });
    const existingUser = await User.findOne({ where: { email: email } });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        // id: existingUser._id,
        id: existingUser.id,
      },
      SECRET_KEY
    );

    res.status(200).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedPassword },
      { where: { id: existingUser.id } }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signin,
  signup,
  forgotPassword,
};
