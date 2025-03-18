import { chatwootApi } from "../config/axios/chatwoot.axios";

export interface SendMessageParam {
  accountId: number;
  conversationId: number;
  message: string;
}

export class ChatwootService {
  public sendMessage = async ({ accountId, conversationId, message }: SendMessageParam) => {
    try {
      const response = await chatwootApi.post(
        `/accounts/${accountId}/conversations/${conversationId}/messages`,
        {
          content: message,
          message_type: "outgoing",
          private: false,
          content_type: "text",
        }
      );

      console.log("✅ Mensaje enviado con éxito:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al enviar el mensaje:", error);
      throw error;
    }
  };
}
