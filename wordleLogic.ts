import { Router, Request, Response } from "express";
import { choosenWord } from "./app";

const word = Router();

function fillTheDictionary(word: string, dic: Map<string, number>) {
  const wordArray = word.split("");
  wordArray.forEach((letter) => {
    if (dic.get(letter)) {
      dic.set(letter, dic.get(letter)! + 1);
    } else {
      dic.set(letter, 1);
    }
  });
}

word.get("/", (req: Request, res: Response) => {
  res.send("in the word route");
});

word.post("/check", (req: Request, res: Response) => {
  const userWord: string = req.body.userWord;
  //const row: number = req.body.row;
  let isEqual: boolean = false;
  const stateArray: string[] = ["", "", "", "", ""];
  const dic = new Map();
  fillTheDictionary(choosenWord, dic);

  if (userWord === choosenWord) {
    isEqual = true;
  }

  for (let i = 0; i < 5; i++) {
    if (userWord[i] === choosenWord[i]) {
      dic.set(userWord[i], dic.get(userWord[i]) - 1);
      stateArray[i] = "greenBG";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (choosenWord.includes(userWord[i])) {
      if (dic.get(userWord[i]) > 0 && stateArray[i] === "") {
        dic.set(userWord[i], dic.get(userWord[i]) - 1);
        stateArray[i] = "yellowBG";
      } else if (stateArray[i] === "") {
        stateArray[i] = "grayBG";
      }
    } else {
      stateArray[i] = "grayBG";
    }
  }
  res.send({ stateArray, isEqual });
});

export default word;
