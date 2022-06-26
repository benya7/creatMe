import fs from "fs";
import path from "path";

export default async function readFile(filePath: string): Promise<string> {

  const text = fs.readFileSync(filePath, { encoding: 'utf8' });
  return text;
}