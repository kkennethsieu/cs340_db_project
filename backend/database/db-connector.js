// Get an instance of mysql so we can use in the app
let mysql = require("mysql2");

// Create a 'connection pool' using the provided credentials
const pool = mysql
	.createPool({
		waitForConnections: true,
		connectionLimit: 10,
		host: "classmysql.engr.oregonstate.edu",
		user: "cs340_sieuk",
		password: "2137",
		database: "cs340_sieuk",
		multipleStatements: true,
	})
	.promise(); // This makes it so we can use async / wait
// const pool = mysql
// 	.createPool({
// 		waitForConnections: true,
// 		connectionLimit: 10,
// 		host: "classmysql.engr.oregonstate.edu",
// 		user: "cs340_patelsuv",
// 		password: "3532",
// 		database: "cs340_patelsuv",
// multipleStatements: true,
// 	})
// 	.promise(); // This makes it so we can use async / wait

module.exports = pool;

// Export it for use in our application
// MediaSourceHandle.exports = pool;
