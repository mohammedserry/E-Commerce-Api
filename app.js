/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

dotenv.config({ path: "config.env" });
const AppError = require("./utils/appError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

// database connection
dbConnection();

// express app
const app = express();

// Enable other domains to access your api
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

// Routes
const mountRoutes = require("./routes");

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down....`);
    process.exit(1);
  });
});
