import { unlink } from "fs/promises";
import { Request, Response } from "express";
import sharp from "sharp";

type UploadTypes = {
  image: Express.Multer.File[];
  images: Express.Multer.File[];
};

export const index = (req: Request, res: Response) => {
  res.send("Opa");
};

export const uploadFile = async (req: Request, res: Response) => {
  // const files = req.files as UploadTypes;

  if (!req.file) return res.status(400).json({ error: "Arquivo inválido." });

  const imageName = `${req.file.filename}.jpeg`;

  await sharp(req.file.path)
    .resize(100)
    .toFormat("jpeg")
    .toFile(`./public/uploads/${imageName}`);

  await unlink(req.file.path);

  res.json({ image: imageName });
};
