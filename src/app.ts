import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import createError from "http-errors";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("CAR REPAIR STATION!");
});

const start = async () => {
  try {
    app.listen(port, () => console.log(`server is listening on ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
