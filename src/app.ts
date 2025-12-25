import express, { Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewires/notFound";
import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json()); 

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


// app.use(cors());

// app.use(
//   cors({
//     origin: ['http://localhost:5173']
//    })
// );


app.use(
  cors({
    origin: ["http://localhost:5173", "https://parcel-delivery-system-frontend-one.vercel.app" ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to parcel delivery system",
  });
});

app.use(globalErrorHandler) ;
app.use(notFound) ;

export default app ;