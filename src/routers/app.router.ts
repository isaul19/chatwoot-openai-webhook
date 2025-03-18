import { Router } from "express";
import { WebhookRouter } from "./webhook.router";

export class AppRouter {
  public static get router() {
    const router = Router();

    router.use("/webhook", WebhookRouter.router);

    return router;
  }
}
