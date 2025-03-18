import { Router } from "express";
import { WebhookController } from "../controllers/webhook.controller";

export class WebhookRouter {
  public static get router() {
    const router = Router();
    const webhookController = new WebhookController();

    router.get("/", webhookController.receiveData);

    return router;
  }
}
