require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const allRoute = require("./routes/index.route");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use("/", allRoute);

app.listen(port, () => {
  console.log(`my app listening on port http://localhost:${port}`);
});
