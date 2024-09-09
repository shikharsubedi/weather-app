import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { apiDocumentation } from "../docs/api";
import "dotenv/config";

const port: number | string = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.disable("x-powered-by");

app.use("/", routes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Resource not found." });
});

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const server = app.listen(port, () => {
  console.info(`server started on http://localhost:${port}`);
});

process.on("uncaughtException", (err: unknown) => {
  console.error(err);
  server.close();
});
