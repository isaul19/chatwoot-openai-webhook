import express from "express";
import cors from "cors";
import { Env } from "../config/adapters/env.adapter";

interface Options {
  PORT?: number;
  APP_ROUTER: express.Router;
}

export class Server {
  private readonly app = express();
  private readonly APP_ROUTER: express.Router;
  private readonly PORT?: number;

  constructor({ APP_ROUTER, PORT }: Options) {
    this.APP_ROUTER = APP_ROUTER;
    this.PORT = PORT;

    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountRoutes = () => {
    this.app.get("/health", (req, res) => {
      res.status(200).send("ok");
    });

    this.app.use("/api", this.APP_ROUTER);
  };

  private mountMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  public getApp = () => {
    return this.app;
  };

  public start = () => {
    if (Env.NODE_ENV !== "development" || !this.PORT) return;

    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  };
}
