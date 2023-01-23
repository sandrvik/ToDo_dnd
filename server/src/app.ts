import {Express} from "express";
import router from "./routes";
import cors from "cors";
import mongoose, {ConnectOptions} from "mongoose";

const express = require("express");
const app: Express = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(router);

const uri: string = `mongodb://127.0.0.1:27017/TodoApp?retryWrites=true&w=majority`
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose
    .set('strictQuery', false)
    .connect(uri, mongooseOptions as ConnectOptions)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`The server is running on port ${PORT}`)
        )
    )
    .catch(e => {
        throw e
    })