import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getWord from "./findRandomWord";
import word from "./wordleLogic";

const app = express();
const port = 3007;

app.use(cors());
app.use(bodyParser.json());
export const choosenWord = getWord();
app.use("/word", word);

app.get("/", (req: Request, res: Response) => {
  res.send(choosenWord);
});

app.listen(port, () => {
  console.log("app is running");
});
