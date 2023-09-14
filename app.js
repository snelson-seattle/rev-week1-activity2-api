const http = require("http");
const winston = require("winston");
const url = require("url");
const querystring = require("querystring");

const groceryItems = [];

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const PORT = process.env.PORT || 3000;
http
  .createServer((request, response) => {
    try {
      const { headers, method } = request;

      // Log incoming request
      logger.info(`${method} request send to endpoint ${request.url}`);

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
          if (method === "GET" && request.url === "/api/groceries") {
            response.writeHead(200, {
              "Content-Type": "application/json",
            });
            response.end(JSON.stringify(groceryItems));
          }

          // POST
          // Creates a new grocery list item
          if (method === "POST" && request.url === "/api/groceries") {
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

          // PUT
          // Update a grocery list item
          if (method === "PUT") {
            const parsed = url.parse(request.url);
            const query  = querystring.parse(parsed.query);
            if(!query.name || groceryItems.length < 1){
                throw new Error("Bad request");
            }

            for(let i = 0; i < groceryItems.length; i++){
                if(groceryItems[i].name === query.name){
                    let item = JSON.parse(body);
                    groceryItems.splice(i, 1, item);
                }
            }

            logger.info("Successfully updated item.");
            response.writeHead(201, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify({"message": "Successfully updated grocery item"}));
          }

          // DELETE
          // Remove an item from the grocery list
          if (method === "DELETE") {
            const parsed = url.parse(request.url);
            const query  = querystring.parse(parsed.query);
            if(!query.name || groceryItems.length < 1){
                throw new Error("Bad request");
            }

            for(let i = 0; i < groceryItems.length; i++){
                if(groceryItems[i].name === query.name){
                    groceryItems.splice(i, 1);
                }
            }
            logger.info("Successfully deleted item.");
            response.writeHead(201, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify({"message": "Successfully deleted grocery item"}));
          }

        });
    } catch (error) {
      logger.error(error.message);
      response.writeHead(400, {
        "Content-Type": "application/json",
      });
      response.end(JSON.stringify({ message: "Bad Request" }));
    }
  })
  .listen(PORT, () => {
    logger.info(
      `Server started listening for requests at http://localhost:${PORT}`
    );
  });
