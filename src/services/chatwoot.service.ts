import { chatwootApi } from "../config/axios/chatwoot.axios";
import { ChatwootRepository } from "../repository/chatwoot.repository";

export interface SendMessageParam {
  accountId: number;
  userId: number;
  conversationId: number;
  message: string;
}

export class ChatwootService {
  public readonly chatwootRepository: ChatwootRepository;

  constructor() {
    this.chatwootRepository = new ChatwootRepository();
  }

  public sendMessage = async ({ accountId, conversationId, userId, message }: SendMessageParam) => {
    try {
      const tokenById = await this.chatwootRepository.getTokenByIdUser(userId);

      const response = await chatwootApi.post(
        `/accounts/${accountId}/conversations/${conversationId}/messages`,
        {
          content: message,
          message_type: "outgoing",
          private: false,
          content_type: "text",
        },
        {
          headers: {
            api_access_token: tokenById.token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("❌ Error al enviar el mensaje:", error);
      throw error;
    }
  };
}
