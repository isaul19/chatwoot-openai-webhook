import util from "util";
import fs from "fs";
import path from "path";

export class Print {
  static log(message: unknown) {
    if (typeof message === "object") {
      console.log(util.inspect(message, false, null, true));
    } else {
      console.log(message);
    }
  }

  static file(message: unknown) {
    const filePath = path.join(__dirname, "..", "..", "logs.txt");
    const parseMessage = util.inspect(message, false, null, false);
    fs.appendFileSync(filePath, `${new Date().toISOString()} - ${parseMessage}\n\n`, "utf-8");
  }
}
