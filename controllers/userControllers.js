import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(208)
    throw new Error("User already registered")
  }

  if (password.length < 6) {
    res.status(406)
    throw new Error("Password must be at least 6 characters")
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


export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
      return res
        .status(200)
        .json({
          message: "User profile fetched successfully",
          user: {
            id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
          }
        });
    }else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length >= 6) {
      user.password = req.body.password;
    } else if (req.body.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    const updatedUser = await user.save();
    return res
      .status(200)
      .json({
        message: 'User profile updated successfully',
        user: {
          id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
        }
      });


  } catch (error) {
    next(error)
  }
}

export const updateProfilePicture = async (req, res, next) => {
  
}