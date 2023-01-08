const { createServer } = require("node:http");

function createApp() {
    return createServer((request, response) => {
    
        response.statusCode = 200;
        
        response.setHeader("Content-Type", "text/html");
        
        const jsonResponseBody = "Welcome to the World Wide Web!";
    
        response.end(jsonResponseBody)
    });
}

module.exports = createApp;
