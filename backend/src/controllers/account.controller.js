import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import User from "../models/user.model.js";

export const checkBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId, 
  });

  res.json({           
    balance: account.balance,
  });
};

export const moneyTransfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body.data;

  if (!amount || !to) {
    return res.json({
      message: "something wrong",
    });
  }

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  console.log("account is there",account)
  
  if (!account || account.balance < amount ) { 
    await session.abortTransaction();
    return res.status(400).json({  
      message: "Insuffiecient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to, 
  }).session(session);

  if (!toAccount ) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
};
  