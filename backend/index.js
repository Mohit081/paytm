import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/db.js";
import cors from "cors";
import userRouter from "./src/routes/user.routes.js";
import accountRouter from "./src/routes/account.router.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: 'https://curious-torrone-4ba67e.netlify.app', // your frontend's origin
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());    

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter); 

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at PORT: ${process.env.PORT || 3000}`);
});
