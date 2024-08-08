const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const expressSession = require("express-session");
const connectSession = require("connect-session-sequelize");
const db = require("./db/db.connection");
const memberRoute = require("./routes/member.route");

const app = express();

//connection to session
const SequelizeStore = connectSession(expressSession.Store);

const store = new SequelizeStore({
  db: db,
});

store.sync();

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
    },
  })
);

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Halo Bray");
});

//route api
app.use("/api", memberRoute);

const port = 5000;

//listen
app.listen(port, () => console.log(`Listening on port ${port}`));
