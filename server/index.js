const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const morgan = require("morgan");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(morgan("dev"));
app.use("/netflix/api/auth", authRoute);
app.use("/netflix/api/users", userRoute);
app.use("/netflix/api/movies", movieRoute);
app.use("/netflix/api/lists", listRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
