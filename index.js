import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const upload = multer();

// CONFIGURAÇÃO DO CLOUDINARY
cloudinary.config({
  cloud_name: "dsvbqqoob",      // <-- substitui pelo teu
  api_key: "xxx",               // <-- só precisas se usares upload assinado
  api_secret: "xxx"             // <-- idem
});

// ENDPOINT PARA RECEBER HEIC E ENVIAR PARA CLOUDINARY
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "heic_uploads",
        upload_preset: "heic_unsigned", // <-- o preset que criaste
        resource_type: "image"
      },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json(result);
      }
    );

    // Enviar o buffer para o stream
    result.end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Servidor HEIC ativo"));
