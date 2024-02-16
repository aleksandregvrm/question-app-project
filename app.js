// main imports
require("dotenv").config();
require("express-async-errors");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require ('cors');
const cookieParser =  require('cookie-parser');
const express =  require('express');
const path = require("path");
// errors
const errorHandler = require ('./middleware/errorHandler');
const notFound = require ('./middleware/notFound');

// db
const connectDB = require ('./db/connect');

// routes
const questionsRouter = require ('./routes/questionRoutes');
const userRouter = require ('./routes/userRoutes');
const quizStatsRouter = require ('./routes/quizStatsRoutes');
const adminRouter = require ('./routes/adminRoutes');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public/dist"));

app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/quizStats",quizStatsRouter);
app.use("/api/v1/ad-controls",adminRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/dist", "index.html"));
});

app.use(errorHandler)
app.use(notFound)

const port = 5002;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`the app is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();