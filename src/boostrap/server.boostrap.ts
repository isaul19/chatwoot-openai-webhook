import express from "express";
import cors from "cors";

interface Options {
  // PORT: number;
  APP_ROUTER: express.Router;
}

export class Server {
  private readonly app = express();
  private readonly APP_ROUTER: express.Router;

  constructor({ APP_ROUTER }: Options) {
    this.APP_ROUTER = APP_ROUTER;

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

  // public start = () => {
  //   this.app.listen(this.PORT, () => {
  //     console.log(`Server running on port ${this.PORT}`);
  //   });
  // };
}
