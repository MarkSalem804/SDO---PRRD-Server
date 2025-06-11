const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const Routes = require("./src/Middlewares/routes-conf");
const clear = require("clear");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");

dotenv.config();

const app = express();
const cors = require("cors");
const corsOptions = require("./src/Middlewares/CORS-conf/cors-options");
const credentials = require("./src/Middlewares/Cors-conf/credentials");
const prisma = new PrismaClient();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware
app.use(credentials);
app.use(cors(corsOptions));

app.use((req, res, next) => {
  // req.prisma = prisma;
  next();
});

Routes(app, prisma);

// const options = {
//   key: fs.readFileSync(
//     "/etc/letsencrypt/live/tripticket.depedimuscity.com/privkey.pem"
//   ),
//   cert: fs.readFileSync(
//     "/etc/letsencrypt/live/tripticket.depedimuscity.com/fullchain.pem"
//   ),
// };

// const server = https.createServer(options, app);

// server.listen(port, () => {
//   clear(); // Clear the terminal when the server starts
//   console.log(`Server running on port ${port}`);
//   console.log(`Environment: ${process.env.NODE_ENV}`);
// });

app.use((req, res) => {
  res.status(404).send("Route not found");
});

// 500 Internal Server Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  clear(); // Clear the terminal when the server starts
  console.log(`Server running on port ${port}`);
});

module.exports = { prisma };
