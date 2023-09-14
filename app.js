const http = require("http");
const winston = require("winston");

const groceryItems = [];

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const PORT = process.env.PORT || 3000;
http
  .createServer((request, response) => {
    try {
      const { headers, method, url } = request;

      // Log incoming request
      logger.info(`${method} request send to endpoint ${url}`);

      // Parse the body
      let body = [];
      request
        .on("error", (err) => {
          throw new Error(err.message);
        })
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();

          // GET
          // Returns all grocery list items
          if (method === "GET" && url === "/api/groceries") {
            response.writeHead(200, {
              "Content-Type": "application/json",
            });
            response.end(JSON.stringify(groceryItems));
          }

          // POST
          // Creates a new grocery list item
          if (method === "POST" && url === "/api/groceries") {
            let item = JSON.parse(body);
            groceryItems.push(item);
            logger.info("New grocery item added.");
            response.writeHead(201, {
              "Content-Type": "application/json",
            });
            response.end(
              JSON.stringify({
                message: "New grocery item added successfully.",
              })
            );
          }
        });
    } catch (error) {}
  })
  .listen(PORT, () => {
    logger.info(
      `Server started listening for requests at http://localhost:${PORT}`
    );
  });
