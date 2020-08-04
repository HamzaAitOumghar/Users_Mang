import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import devBundle from "./devBundle";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import StaticRouter from "react-router-dom/StaticRouter";
import MainRouter from "./../client/MainRouter";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
devBundle.compile(app);

app.use("/", userRoutes);
app.use("/", authRoutes);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ":" + err.message });
    console.log(err);
  }
});

app.get("*", (req, res) => {
  const ctx = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={ctx}>
      <MainRouter />
    </StaticRouter>
  );
  if (ctx.url) {
    return res.redirect(303, ctx.url);
  }
  res.status(200).send(
    Template({
      markup: markup,
    })
  );
});

export default app;
