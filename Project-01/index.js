import express from "express";
import connectMongoDb from "./connection.js";

import logReqRes from "./middlewares/index.js";

import userRouter from "./routes/user.js";

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://localhost:27017/shakira").then(() =>
	console.log("MongoDB Connected Successfully!"),
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
