import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(208)
    throw new Error("User already registered")
  }

    user = await User.create({
      name,
      email,
      password,
    });
  
    return res
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
          token: await user.generate_token(),
        },
      });
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401)
      throw new Error("User not found")
      }
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(406)
        throw new Error("Invalid credentials")
      }
      return res
        .status(200)
        .json({
          message: "User logged in successfully",
          user: {
            id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generate_token(),
          },
        });
    }
  } catch (error) {
    next(error)
  }
}

