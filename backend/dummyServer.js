const http = require("http");

const server =  http.createServer((req,res)=>{
    console.log("server started");
})

server.listen(808)