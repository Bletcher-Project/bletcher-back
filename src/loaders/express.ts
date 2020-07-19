import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "config";
import routes from "routes/api";
import imgRoute from "routes/image";

export default ({ app }: { app: Application }) => {
  /* CONNECTION TEST */
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello BLETCHER");
  });

  /* PROXY */
  app.enable("trust proxy");

  /* ALLOW CONNECT BACK-FRONT */
  const corsOptions = {
    origin: config.reqAddress,
    credentials: true,
  };
  app.use(cors(corsOptions));

  /* FOR USE RESTful API */
  app.use(require("method-override")());

  /* REQUEST DATA */
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  /* ROUTER */
  app.use(config.api.prefix, routes);
  app.use("/image", imgRoute);

  /* catch 404 and forward to error handler */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  /* error handler */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
};
