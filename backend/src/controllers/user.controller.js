import zod from "zod";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Account } from "../models/account.model.js";

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

export const userSignup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  console.log(username, firstName, lastName, password);
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: " Incorrect input",
    });
  }

  const user = await User.findOne({
    username: username,
  });

  if (user) {
    return res.json({
      message: "Email already taken / Incorrect input",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

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

  console.log(username , password)
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({
      message: "username not find or incorrect",
    });    
  } 

  const validPassword = async () => {
    await bcrypt.compare(password, user.password);
  }; 

  if (!validPassword) {
    return res.json({
      message: "username not find",
    });
  }

  const balance = await Account.findOne({
    userId: user._id
  })

  const token = jwt.sign(
    {
      userId: user._id,
    }, 
    process.env.JWT_SECRET
  );
 
  res.json({
    firstName:user.firstName,
    lastName:user.lastName,
    balance:balance.balance,
    message: "success",
    token
  });
};
 
export const updateUser = async (req, res) => {
   console.log(req.body)
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

export const getAllUser = async(req, res) => {
  try {
    const users = await User.find().select('-password').limit(10);

    if(!users){
      return res.json({
        message: "fetch user error"
      })
    }

    res.status(200).json({
      message:"user fetch successfully",
      users
    })
  } catch (error) {
    return res.json({
      message: "something wrong fetching users"
    })
  }
}
