import Image from '../models/image';
// import Post from '../models/post';
import { IImageDetail } from '../interfaces/image';

export const postPostImage = async (
  imageInfo: IImageDetail,
): Promise<Image | null> => {
  await Image.create({
    name: imageInfo.name,
    type: imageInfo.type,
    path: imageInfo.path,
    width: imageInfo.width,
    heigt: imageInfo.height,
  });
  const imageid = await Image.findOne({
    where: { name: imageInfo.name },
    attributes: ['id'],
  });
  return imageid;
};

export const getPostImagePath = async (id: number): Promise<Image | null> => {
  const postimagepath = await Image.findOne({
    // include: [
    //   {
    //     model: Post,
    //     attributes: ['id', 'title'],
    //   },
    // ],
    where: { id },
    attributes: ['path'],
  });
  return postimagepath;
};
