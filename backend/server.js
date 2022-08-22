import express from "express";
import dotenv from "dotenv/config";
import colors from "colors";
import connectDB from "./config/db.js";
import errorHandler from "../middleware/errorMiddleware.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/goals", goalRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Hello Sachin ${port}`);
})