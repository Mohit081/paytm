import zod from "zod";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Account from "../models/account.model";

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

export const userSignup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect input",
    });
  }

  const user = User.findOne({
    username: username,
  });

  if (user) {
    return res.json({
      message: "Email already taken / Incorrect input",
    });
  }

  const hashPassword = async () => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const dbUser = await User.create({
    username,
    firstName,
    lastName,
    password: hashPassword,
  });

  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000,
  });

  res.json({
    message: "user signup successfully",
  });
};

export const userSignin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      message: "all filed are required",
    });
  }

  const user = await User.findOne(username);
  if (!user) {
    return res.json({
      message: "username not find",
    });
  }

  const validPassword = async () => {
    const isValid = await bcrypt.compare(password, user.password);
  };

  if (!validPassword) {
    return res.json({
      message: "username not find",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "user login",
    token,
  });
};

export const updateUser = async (req, res) => {
  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "updated successfully",
  });
};

export const getUser = async (req, res) => {
  const { filter } = req.query || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};
