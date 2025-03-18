import type { Request, Response } from "express";

export class WebhookController {
  public receiveData = async (req: Request, res: Response) => {
    console.log("receiveData");
    console.log(req);

    res.status(200).json({ message: "ok" });
  };
}
