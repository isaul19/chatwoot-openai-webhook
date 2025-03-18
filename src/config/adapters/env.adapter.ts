import "dotenv/config";
import { get } from "env-var";

export class Env {
  public static get CHATWOOT_API_KEY() {
    return get("CHATWOOT_API_KEY").required().asString();
  }
}
