import express from "express";

const Router = express.Router();

Router.post("/signup",userSignup);

module.export = Router;