const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const repos = require('./routes/repos')
require("dotenv").config();

// connect to mongoDb with mongoose
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    function (error) {
        if (error) { 
            console.log("Error!" + error);
        } else {
            console.log("Connencted to db");
        }
    }
);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/repos', repos);

app.get("/", (req, res) => {
    res.send("Repo-project");
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});