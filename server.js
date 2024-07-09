const http = require('http');
const app = require("./app");
const port = 7000;
const host="192.168.31.240";
// const host="0.0.0.0";
const server = http.createServer(app);

// Pass your local IP address as the first argument to listen()
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}/`);
});