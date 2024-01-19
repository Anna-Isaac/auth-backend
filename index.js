const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { default: helmet } = require("helmet");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const { MONGO_URI, PORT } = process.env;

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

//Routes
app.use("/", authRoute);

//CORS Configuration
app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    methods: ["GET", "POST", "PUT", "PATCH" ,"DELETE", "OPTIONS"],
    origin: ["http://localhost:3000"],
    allowedHeaders: [
      "X-Api-Key",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",],
  })
);

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


//Server Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});