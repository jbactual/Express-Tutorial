const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const members = require("./api/members_list");

const app = express();

// Middleware
const logger = require("./middleware/logger");

// Initialize Middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());

// Parse Form Submissions or urls
app.use(
  express.urlencoded({
    extended: false
  })
);

app.engine(
  "handlebars",
  hbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Home Page Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Title of index",
    members
  });
});

// Response Methods
app.get("/response-methods", (req, res) => {
  res.render("response-methods");
});

// Response Chaining
app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    const something = req.body;
    console.log("/book fired");
    console.log(something, "something");

    const variable = something.name;
    console.log(variable);

    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

app.get("/download", (req, res) => {
  res.download("notes.txt");
});

// Example
var cb0 = function(req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function(req, res, next) {
  console.log("CB1");
  next();
};

app.get(
  "/example/d",
  [cb0, cb1],
  function(req, res, next) {
    console.log("the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from D!");
  }
);

// Set static folder -> serves all html files in the public folder
// Used for static pages with no interpolation
// app.use(express.static(path.join(__dirname, 'public')));

// Using the express.Routes() -> folder: routes/api/members
// '/api/members' -> parent route, require(filepath)
app.use("/api/members", require("./routes/api/members"));

// 404 Response Catcher
app.use(function(req, res, next) {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
