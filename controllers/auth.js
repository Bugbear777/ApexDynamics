const mongodb = require("../data/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await mongodb
      .getDb()
      .collection("users")
      .findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName
    };

    const response = await mongodb.getDb().collection("users").insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ message: "User created successfully." });
    } else {
      res.status(500).json({ message: "Failed to create user." });
    }
  } catch (err) {
    res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await mongodb
      .getDb()
      .collection("users")
      .findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful. Discard the token on the client." });
};

module.exports = {
  register,
  login,
  logout
};