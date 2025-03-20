import type { Request, Response } from "express";
import { ChatwootRequest } from "../types/chatwoot.types";
import { ChatwootService } from "../services/chatwoot.service";
import { Print } from "../utils/print";

export class WebhookController {
  private readonly chatwootService: ChatwootService;

  constructor() {
    this.chatwootService = new ChatwootService();
  }

  public receiveData = async (req: Request, res: Response) => {
    console.log("POST receiveData");
    const body: ChatwootRequest = req.body;

    try {
      const msgObj = body.conversation.messages[0];
      if (msgObj.sender_type !== "User") {
        const accountId = body.account.id;
        const conversationId = body.conversation.id;
        const message = "Hola! Esto es una respuesta automática 🚀";

        await this.chatwootService.sendMessage({
          accountId,
          conversationId,
          message,
          userId: msgObj.conversation.assignee_id,
        });
      }

      res.status(200).json({ message: "Mensaje enviado correctamente" });
    } catch (error) {
      console.error("❌ Error al procesar el webhook:", error);
      res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  };
}
