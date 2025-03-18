import type { Request, Response } from "express";
import { ChatwootRequest } from "../types/chatwoot.types";
import { ChatwootService } from "../services/chatwoot.service";

export class WebhookController {
  private chatwootService: ChatwootService;

  constructor() {
    this.chatwootService = new ChatwootService();
  }

  public receiveData = async (req: Request, res: Response) => {
    console.log("📩 Recibiendo datos de Chatwoot Webhook...");
    const body: ChatwootRequest = req.body;
    console.log(body);

    try {
      const accountId = body.account.id;
      const conversationId = body.conversation.id;
      const message = "Hola! Esto es una respuesta automática 🚀";

      const response = await this.chatwootService.sendMessage({
        accountId,
        conversationId,
        message,
      });

      console.log("✅ Mensaje enviado con éxito:", response);
      res.status(200).json({ message: "Mensaje enviado correctamente" });
    } catch (error) {
      console.error("❌ Error al procesar el webhook:", error);
      res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  };
}
