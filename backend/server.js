//Database
const db = require("./database/db-connector");

//express
const express = require("express");
const app = express();
const PORT = 9040;

// Middleware
const cors = require("cors");
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
//Routes

const festivalRouter = require("./festivals.route.js");
const artistsRouter = require("./artists.route.js");
const sponsorsRouter = require("./sponsors.route.js");
const staffRouter = require("./staff.route.js");
const vendorsRouter = require("./vendors.route.js");

app.use("/festivals", festivalRouter);
app.use("/artists", artistsRouter);
app.use("/sponsors", sponsorsRouter);
app.use("/staff", staffRouter);
app.use("/vendors", vendorsRouter);

app.listen(PORT, function () {
	console.log(
		`Express started on http://classwork.engr.oregonstate.edu:${PORT}`
	);
});
