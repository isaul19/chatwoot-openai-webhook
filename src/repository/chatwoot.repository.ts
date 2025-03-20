import { Database } from "../boostrap/database.boostrap";

export class ChatwootRepository {
  private readonly database: Database;

  constructor() {
    this.database = new Database();
  }

  public getUserTokenByIdUser = async (idUser: number) => {
    const query = `SELECT token FROM access_tokens WHERE owner_id = $1 AND owner_type = 'User';`;
    const response = await this.database.query(query, [idUser]);
    return response[0] as { token: string };
  };

  public getOpenaiDataByIdInbox = async (idInbox: number) => {
    const query = `
    SELECT ao.openai_token, ao.id_assistant
    FROM inboxes i
    JOIN channel_whatsapp cn ON i.channel_id = cn.id
    JOIN accounts_openai ao ON cn.phone_number = ao.account_phone
    WHERE i.id = $1;
  `;

    const response = await this.database.query(query, [idInbox]);
    return response[0] as { openai_token: string; id_assistant: string };
  };

  public getThreadByIdConversation = async (idConversation: number) => {
    const query = `SELECT id_thread FROM conversations_threads WHERE id_conversation = $1`;
    const response = await this.database.query(query, [idConversation]);
    console.log("getThreadByIdConversation");
    console.log({ response });

    return response.length === 0 ? { id_thread: null } : (response[0] as { id_thread: string });
  };

  public saveThread = async ({
    idConversation,
    idThread,
  }: {
    idConversation: number;
    idThread: string;
  }): Promise<void> => {
    const query = `
      INSERT INTO conversations_threads (id_conversation, id_thread)
      VALUES ($1, $2)`;
    await this.database.query(query, [idConversation, idThread]);
  };
}
