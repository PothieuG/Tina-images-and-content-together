import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filepath } = req.query;

  if (!filepath || typeof filepath !== 'string') {
    res.status(400).send('Filepath is required');
    return;
  }

  const unescapedFilepath = decodeURIComponent(filepath);
  const imagePath = path.join(process.cwd(), 'content/', unescapedFilepath);

  console.log('Serving image from:', imagePath);

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const contentType = `image/${path.extname(unescapedFilepath).slice(1)}`;

    res.setHeader('Content-Type', contentType);
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error reading image:', error);
    res.status(404).send('Image not found');
  }
}