const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Rejection`);
    process.exit(1);
})


// config
dotenv.config({path:"backend/config/config.env"})

// Connecting to database
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`sesrver is working on http://localhost:${process.env.PORT}`);
})
<<<<<<< HEAD
    
=======

>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
// unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})