import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/db.js";
import cors from "cors";
import userRouter from "./src/routes/user.routes.js"
import accountRouter from "./src/routes/account.router.js"



dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("api/v1/user", userRouter);
app.use("api/v1/account", accountRouter);

app.listen(process.env.PORT || 3000);
