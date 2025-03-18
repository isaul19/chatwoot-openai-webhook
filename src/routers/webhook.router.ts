import { Router } from "express";
import { WebhookController } from "../controllers/webhook.controller";

export class WebhookRouter {
  public static get router() {
    const router = Router();
    const webhookController = new WebhookController();

    router.post("/", webhookController.receiveData);

    return router;
  }
}
