import { Client, QueryResultRow } from "pg";
import { Env } from "../config/adapters/env.adapter";

export class Database {
  private async startConnection(): Promise<Client> {
    console.log("startConnection");

    const client = new Client({
      host: Env.DB_HOST,
      user: Env.DB_USER,
      database: Env.DB_NAME,
      password: Env.DB_PASSWORD,
      port: Env.DB_PORT,
    });

    await client.connect();
    return client;
  }

  public async query<T extends QueryResultRow>(sql: string, values?: any[]): Promise<T[]> {
    const client = await this.startConnection();
    try {
      const result = await client.query<T>(sql, values);
      return result.rows;
    } catch (error) {
      console.error("Error executing query...", error);
      throw error;
    } finally {
      await client.end();
    }
  }
}
