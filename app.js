const http = require("http");
const winston = require("winston");

const groceryItems = [];

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // SET UP ENDPOINTS HERE
  try {
    if (req.method === "GET" && req.url === "/api/groceries") {
      logger.info(`${req.method} request made to endpoint ${req.url}`);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(groceryItems));
    }else {
        throw new Error("Bad Request");
    }
  } catch (error) {
    res.writeHead(500, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify({"message": "Something went wrong"}));
    logger.error(`${req.method} request made to endpoint ${req.url} failed`);
  }
}).listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    logger.info("Server started");
})
