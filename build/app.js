import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.get("/", (req, res) => {
    res.send("CAR REPAIR STATION!");
});
const start = async () => {
    try {
        app.listen(port, () => console.log(`server is listening on ${port}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=app.js.map