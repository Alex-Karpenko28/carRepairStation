import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes";
import { AppDataSource } from "./data-source";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { ValidateError } from "tsoa";
import { ApiError } from "./error/ApiError";
import  config from "./shared/config";

const app = express();

const port = config.get('port');


app.use(helmet());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof ApiError) {
    return res.status((err as ApiError).statusCode).json({
      name: (err as ApiError).name,
      status: (err as ApiError).statusCode,
      message: (err as ApiError).message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(port, () => console.log(`server is listening on ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
