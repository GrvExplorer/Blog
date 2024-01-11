import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({ message: "User already registered" });
  }

  user = await User.create({
    name,
    email,
    password,
  });

  return res
    .status(201)
    .send({
      message: "User created successfully",
      user: {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: null,
      },
    });
};
