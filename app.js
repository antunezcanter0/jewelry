const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const serveStatic = require("serve-static");
const path = require("path");

require("./utils/passport")(passport);

// settings
app.set("port", process.env.PORT || 3000);
app.set("ip", process.env.IP || "127.0.0.1");
app.set("secret", process.env.SECRET || "\x92\x00k\xd8\x16\x06\xd3\xe7\xe8\xce");

// middlewares
app.use(morgan("dev"));
app.use(express.static("static"));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: app.get("secret"),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', serveStatic(path.join(__dirname, "/frontend/dist")))

// routes
const router = require("./routes")(app);

app.listen(app.get("port"), () => {
  console.log(`Visite: http://${app.get("ip")}:${app.get("port")}`);
});
