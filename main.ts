import { Server } from "./src/boostrap/server.boostrap";
import { AppRouter } from "./src/routers/app.router";
import serverless from "serverless-http";

const server = new Server({
  // PORT: Env.SERVER_PORT,
  APP_ROUTER: AppRouter.router,
});

export const handler = serverless(server.getApp());
