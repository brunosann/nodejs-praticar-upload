import express, { Request, Response, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import path from "path";
import { MulterError } from "multer";

import router from "./routes";

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req: Request, res: Response) => {
  res.send("Pagina não encontrada");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400);

  if (err instanceof MulterError) {
    res.json({ error: err.code });
  } else {
    console.log(err);
    res.json({ error: "Ocorreu algum erro." });
  }
};
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`running at http://localhost:${process.env.PORT}`);
});
