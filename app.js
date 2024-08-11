require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//API
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`my app listening on port http://localhost:${port}`);
});
