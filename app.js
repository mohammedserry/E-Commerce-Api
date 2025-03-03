/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

dotenv.config({ path: "config.env" });
const AppError = require("./utils/appError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const { webhookCheckout } = require("./controllers/orderController");

// database connection
dbConnection();

// express app
const app = express();

// Enable other domains to access your api
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// Checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

// middlewares
app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

// To apply data sanitization
app.use(mongoSanitize());
app.use(xss());

// Limit each IP to 100 requests per `window` (here, per 15 minutes).
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: "Too many accounts created from this IP, please try after an hour",
});

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      "price",
      "sold",
      "quantity",
      "ratingsAverage",
      "ratingsQuantity",
    ],
  })
);

// Apply the rate limiting middleware to all requests.
app.use("/api/v1/auth/forgotPassword", limiter);

// Routes
const mountRoutes = require("./routes");

// Mount Routes
mountRoutes(app);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

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
