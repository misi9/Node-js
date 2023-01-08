import express from "express";
import "express-async-errors";

const app = express();

app.get("./", (request, response) => {
    response.send("up and running");

});


const port = 3000;

app.listen(port, () =>{
  console.log(`[server]: The server is running at http://localhost:${port}`)
});