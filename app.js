const http = require("http");
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {

    // SET UP ENDPOINTS HERE
});

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});


