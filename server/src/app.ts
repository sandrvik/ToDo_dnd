import {Express} from "express";
import router from "./routes";
import cors from "cors";

const express = require("express");
const app: Express = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})