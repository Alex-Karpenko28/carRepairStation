import express from "express";
import "dotenv/config";
import helmet from "helmet";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes";
import { AppDataSource } from "./data-source"
import createError from "http-errors";

const app = express();

const port = process.env.PORT || 3000;

app.use(helmet());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// app.get("/", (req: Request, res: Response) => {
//   res.send("CAR REPAIR STATION!");
// });

RegisterRoutes(app);

const start = async () => {
  try {
    await AppDataSource.initialize()
    app.listen(port, () => console.log(`server is listening on ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
