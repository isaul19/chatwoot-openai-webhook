import "dotenv/config";
import { get } from "env-var";

export class Env {
  public static get CHATWOOT_API_KEY() {
    return get("CHATWOOT_API_KEY").required().asString();
  }

  public static get DB_HOST() {
    return get("DB_HOST").required().asString();
  }

  public static get DB_USER() {
    return get("DB_USER").required().asString();
  }

  public static get DB_NAME() {
    return get("DB_NAME").required().asString();
  }

  public static get DB_PASSWORD() {
    return get("DB_PASSWORD").required().asString();
  }

  public static get DB_PORT() {
    return get("DB_PORT").default(5433).asInt();
  }
}
