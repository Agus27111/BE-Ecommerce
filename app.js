const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");
const db = require("./db/db.connection");

const userRoute = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 5001;

//conection to session
const sessionStore = connectSessionSequelize(session.Store);
const store = new sessionStore({
  db: db,
});
store.sync();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routh
app.get("/", (req, res) => {
  res.send("Hello World");
});

//api
app.use("/", userRoute);

//listen
app.listen(port, () => {
  console.log(`Aplikasi berjalan di dalam port ${port}`);
});
