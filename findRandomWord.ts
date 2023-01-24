import { wordBank } from "./wordBanck";

export default function getWord(): string {
  const wordBankLenght: number = wordBank.length;
  const index = Math.floor(Math.random() * wordBankLenght);
  return wordBank[index];
}
