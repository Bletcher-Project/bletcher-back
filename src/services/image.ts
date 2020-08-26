import Image from '../models/image';
import { IImageDetail } from '../interfaces/image';

const cloudinary = require('cloudinary').v2;

export const postImage = async (
  imageInfo: IImageDetail,
): Promise<Image | null> => {
  await Image.create({
    name: imageInfo.name,
    type: imageInfo.type,
    path: imageInfo.path,
  });
  const imageid = await Image.findOne({
    where: { name: imageInfo.name },
    attributes: ['id'],
  });
  return imageid;
};

export const getImage = async (id: number): Promise<Image | null> => {
  const image = await Image.findOne({
    where: { id },
  });
  return image;
};

export const deleteImage = async (id: number): Promise<number> => {
  const imageName = await getImage(id);
  let image = 0;
  if (imageName?.name) {
    await cloudinary.api.delete_resources(imageName?.name);
    image = await Image.destroy({
      where: { id },
    });
  }
  return image;
};
