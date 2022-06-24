import fs from "fs";
import path from "path";

export default async function readFile(filePath: string): Promise<string> {
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  const text = fs.readFileSync(resolvedPath, { encoding: 'utf8' });
  return text;
}