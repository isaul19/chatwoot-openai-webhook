import { Database } from "../boostrap/database.boostrap";

export class ChatwootRepository {
  private readonly database: Database;

  constructor() {
    this.database = new Database();
  }

  public getTokenByIdUser = async (idUser: number) => {
    const query = `SELECT token FROM access_tokens WHERE owner_id = $1 AND owner_type = 'User';`;
    const response = await this.database.query(query, [idUser]);
    return response[0] as { token: string };
  };
}
