import Parser from "./parser";
import CodeWriter from "./codewriter";
import * as fs from "fs";

const fileName = process.argv[2];
const parser = new Parser();
const codewriter = new CodeWriter();
let newFile = "";
const data = fs.readFileSync(`${fileName}.vm`, "utf-8");
let lines = data.split("\r\n");
lines = lines.map(e => parser.clear(e)).filter(e => e);

for (let pc = 0; pc < lines.length; pc++) {
  const line = lines[pc];
  const C_TYPE = parser.commandType(line);

  let newLine = "";

  if (C_TYPE === "C_PUSH" || C_TYPE === "C_POP") {
    newLine = codewriter.writePushPop(
        C_TYPE,
        line.split(" ")[1] as any,
        Number(line.split(" ")[2])
      );
  }
  if (C_TYPE === "C_ARITHMETIC") {
    newLine = codewriter.writeArithmetic(line as any);
  }
  newFile += newLine.trim().replace(/ /g, "") + "\r\n";
}

fs.writeFileSync(`${fileName}.asm`, newFile);
