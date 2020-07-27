import { Router, Request, Response } from 'express';
import fs from 'fs';

const imageRouter = Router();

imageRouter.get('/:category/:imgName', (req: Request, res: Response) => {
  fs.readFile(
    `uploads/${req.params.category}/${req.params.imgName}`,
    (error, data) => {
      if (error) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).end(data);
    },
  );
});

export default imageRouter;
