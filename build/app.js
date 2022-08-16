"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
// app.get("/", (req: Request, res: Response) => {
//   res.send("CAR REPAIR STATION!");
// });
(0, routes_1.RegisterRoutes)(app);
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