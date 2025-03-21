import { chatwootApi } from "../config/axios/chatwoot.axios";
import { ChatwootRepository } from "../repository/chatwoot.repository";
import { questionToOpenaiAssistant } from "../utils/assistant";

export interface SendMessageParam {
  accountId: number;
  userId: number;
  conversationId: number;
  message: string;
  idInbox: number;
}

export class ChatwootService {
  public readonly chatwootRepository: ChatwootRepository;

  constructor() {
    this.chatwootRepository = new ChatwootRepository();
  }

  public sendMessage = async ({ accountId, conversationId, userId, message }: SendMessageParam) => {
    try {
      const tokenById = await this.chatwootRepository.getUserTokenByIdUser(userId);

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

  public sendMessageToAssistant = async ({
    accountId,
    conversationId,
    userId,
    message,
    idInbox,
  }: SendMessageParam) => {
    console.log("sendMessageToAssistant");

    const { id_assistant, openai_token } = await this.chatwootRepository.getOpenaiDataByIdInbox(
      idInbox
    );

    console.log("get id_assistant and openai_token");

    const { id_thread } = await this.chatwootRepository.getThreadByIdConversation(conversationId);

    console.log("get id_thread");

    const openaiResponse = await questionToOpenaiAssistant({
      idAssistant: id_assistant,
      threadId: id_thread,
      messages: [message],
      tokenOpenAI: openai_token,
      conversationId: conversationId,
    });

    console.log("questionToOpenaiAssistant");

    await this.sendMessage({
      accountId,
      userId,
      conversationId,
      message: openaiResponse,
      idInbox,
    });
    console.log("sendMessage");
  };
}
