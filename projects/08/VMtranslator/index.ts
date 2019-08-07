import Parser from "./parser";
import CodeWriter from "./codewriter";
import * as fs from "fs";
import * as path from "path";

const argv2 = process.argv[2];
const parser = new Parser();
const codewriter = new CodeWriter();

class Main {
  // true -> 有文件
  // false -> 没有这个文件
  static isFileExist(fileName: string) {
    return fs.existsSync(path.resolve("./projects", `${fileName}.vm`));
  }
  static readFile(fileName: string): string {
    const isExist = Main.isFileExist(fileName);
    if (isExist) {
      return fs.readFileSync(
        path.resolve("./projects", `${fileName}`) + ".vm",
        "utf-8"
      );
    } else {
      return fs.readFileSync(
        path.resolve("./projects", `${fileName}`, "../Sys.vm"),
        "utf-8"
      );
    }
  }
  static init(fileName: string): string {
    let newFile = "";
    const data = Main.readFile(fileName);
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
      const command1 = line.split(" ")[1];
      const command2 = line.split(" ")[2];
      if (C_TYPE === "C_LABEL") {
        newLine = codewriter.writeLabel(command1);
      }
      if (C_TYPE === "C_IF") {
        newLine = codewriter.writeIF(command1);
      }
      if (C_TYPE === "C_GOTO") {
        newLine = codewriter.writeGOTO(command1);
      }
      if (C_TYPE === "C_FUNCTION") {
        newLine = codewriter.writeFunction(command1, command2);
      }
      if (C_TYPE === "C_RETURN") {
        newLine = codewriter.writeReturn();
      }
      if (C_TYPE === "C_CALL") {
        const [fileName, functionName] = command1.split(".");
        if (!RegExp(`(${fileName})`).test(newFile)) {
          newFile =
            `
            // ========================= main sub function =========================
            ${Main.init(
              argv2
                .split("/")
                .map((e, i, a) => (i == a.length - 1 ? fileName : e))
                .join("/")
            )}
            // ========================= main sub function =========================
          ` + newFile;
        }
        newLine = codewriter.writeCall(command1, command2);
      }
      if (!newLine) {
        console.log(newLine);
      }

      newFile += newLine;
    }
    return newFile;
  }
}

if (Main.isFileExist(argv2)) {
  fs.writeFileSync(
    path.resolve("./projects", `${argv2}.asm`),
    Main.init(argv2)
  );
} else {
  // 找不到 就默认 Sys 文件
  fs.writeFileSync(
    path.resolve("./projects", `${argv2}.asm`),
    `
    @256
    D=A
    @SP
    M=D
    ${codewriter.writeCall("Sys.init", "0")}
    ${Main.init(argv2)}
  `
  );
}
