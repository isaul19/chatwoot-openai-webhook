import type { Request, Response } from "express";
import { ChatwootRequest } from "../types/chatwoot.types";
import { ChatwootService } from "../services/chatwoot.service";
import { Print } from "../utils/print";
import { questionToOpenaiAssistant } from "../utils/assistant";

export class WebhookController {
  private readonly chatwootService: ChatwootService;

  constructor() {
    this.chatwootService = new ChatwootService();
  }

  public receiveData = async (req: Request, res: Response) => {
    const body: ChatwootRequest = req.body;

    try {
      const msgObj = body.conversation.messages[0];

      // Respond only if the message was not created by a User (i.e., it was sent by the Chatwoot Agent)
      if (msgObj.sender_type !== "User") {
        await this.chatwootService.sendMessageToAssistant({
          accountId: body.account.id,
          conversationId: body.conversation.id,
          message: body.content,
          userId: msgObj.conversation.assignee_id,
          idInbox: body.conversation.contact_inbox.id,
        });
      }

      res.status(200).json({ message: "Mensaje enviado correctamente" });
    } catch (error) {
      console.error("❌ Error al procesar el webhook:", error);
      res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  };
}
