import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "newUser added successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("enter email and password");
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordIsMatch) {
      return res.status(401).json({ message: "Invalide credentials" });
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    await User.updateOne({ _id: user._id }, { refreshToken }); //store the refresh token in db

    const { password: hashedPassword, ...rest } = user._doc;

    const responsePayload = { password: hashedPassword, ...rest };

    res
      .cookie("access_token", accessToken, { httpOnly: true, maxAge: 900000 }) // 15 minutes
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 604800000,
      }) // 7 days
      .status(200)
      .json(responsePayload);
  } catch (error) {
    next(error);
  }
};
