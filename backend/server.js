import express from "express";
import dotenv from "dotenv/config";
import errorHandler from "../middleware/errorMiddleware.js";
import routes from "./routes/goalRoutes.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/goals", routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Hello Sachin ${port}`);
})