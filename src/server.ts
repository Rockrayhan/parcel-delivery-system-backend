import { Server } from "http";
import mongoose from "mongoose";

// import { seedSuperAdmin } from "./app/ultis/seedSuperAdmin";
import { envVars } from "./app/config/env";
import app from "./app";


let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to DB..!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening to port  ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

 startServer() ;

// (async () => {
//     await startServer()
//     await seedSuperAdmin()
// })() ;



process.on("unhandledRejection", (err) => {
  console.log(
    "unhandled Rejection Error Detected... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});


process.on("uncaughtException", (err) => {
  console.log(
    "uncaught Exception Error Detected... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});



process.on("SIGTERM", (err) => {
  console.log(
    "SIGTERM sigal received... Server Shutting Down.",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch this promise"));
// throw new Error ("I forget to handle this local error");
