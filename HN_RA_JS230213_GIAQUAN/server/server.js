const express = require("express");
const server = express();
const port = 3001;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin.routes");

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
server.use(bodyParser.json());

server.use(morgan("dev"));

server.use(cors());

server.use("/api/v1/admin", adminRoutes);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
