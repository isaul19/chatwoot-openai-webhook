import { Server } from "./src/boostrap/server.boostrap";
import { Env } from "./src/config/adapters/env.adapter";
import { AppRouter } from "./src/routers/app.router";
import serverless from "serverless-http";

const server = new Server({
  PORT: 3001,
  APP_ROUTER: AppRouter.router,
});

if (Env.NODE_ENV === "development") {
  server.start();
}

export const handler = Env.NODE_ENV === "production" ? serverless(server.getApp()) : undefined;
