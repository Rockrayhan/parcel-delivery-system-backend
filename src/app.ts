import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import notFound from "./app/middlewires/notFound";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to parcel delivery system",
  });
});


app.use(notFound) ;

export default app ;