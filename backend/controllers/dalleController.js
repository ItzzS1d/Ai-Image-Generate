import OpenAIApi from "openai";
import Dalle from "./../modals/dalleModel.js";
import { v2 as cloudinary } from "cloudinary";
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createDalle = async (req, res) => {
  try {
    const { prompt, name } = req.body;
    const result = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const image = result.data[0].url;
    const uploadRes = await cloudinary.uploader.upload(image);

    const data = await Dalle.create({
      photo: uploadRes.secure_url,
      prompt,
      name,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllDalle = async (req, res) => {
  try {
    const images = await Dalle.find();
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
