const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (like CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to read the local "database"
const readDB = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

// Route for the home page
app.get("/", (req, res) => {
  res.render("index", { name: "", errorMessage: "" });
});

// Route for the user API (POST request)
app.post("/", (req, res) => {
  const { username } = req.body;

  // Read the existing users from db.json
  let db = readDB();
  let users = db.users;

  // Check if the username already exists
  const userExists = users.some((user) => user.name === username);
  if (userExists) {
    // Render the index page with a reserved user message
    return res.render("index", {
      name: username,
      errorMessage: `This user is reserved.`,
    });
  } else {
    // Name is available, redirect to payment page
    return res.redirect(`/payment/${username}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
