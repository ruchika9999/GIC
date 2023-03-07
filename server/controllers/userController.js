const asyncHandler = require("express-async-handler");
const byScrip = require("bcrypt");
const User = require("./../models/userModel");
const jwt = require("Jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all filed required");
  }

  const user = await User.findOne({ email });

  if (user && (await byScrip.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.firstName,
          email: user.email,
          roles: user.roles,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "No user found" });
    throw new Error("Email or password not valid");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, roles } = req.body;

  if (!email || !password || !firstName || !lastName || !roles) {
    res.status(400);
    throw new Error("All field required");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User Already here");
  }
  const hashPassword = await byScrip.hash(password, 10);

  const user = await User.create({
    email,
    password: hashPassword,
    lastName,
    firstName,
    roles,
  });

  console.log("user created", user);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.json({ message: "registration success" });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { loginUser, registerUser, currentUser };
