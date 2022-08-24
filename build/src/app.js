"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const data_source_1 = require("./data-source");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const tsoa_1 = require("tsoa");
const ApiError_1 = require("./error/ApiError");
const config_1 = __importDefault(require("./shared/config"));
const app = (0, express_1.default)();
const port = config_1.default.get('port');
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
(0, routes_1.RegisterRoutes)(app);
app.use(function notFoundHandler(_req, res) {
    res.status(404).send({
        message: "Not Found",
    });
});
app.use(function errorHandler(err, req, res, next) {
    if (err instanceof tsoa_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({
            name: err.name,
            status: err.statusCode,
            message: err.message,
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
        await data_source_1.AppDataSource.initialize();
        app.listen(port, () => console.log(`server is listening on ${port}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=app.js.map