import Funding from '../models/funding';
import { IUserAction } from '../interfaces/user';

export const checkFundingExists = async (params: IUserAction): Promise<boolean> => {
  const funding: Funding | null = await Funding.findOne({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return funding != null;
};

export const addFunding = async (params: IUserAction): Promise<void> => {
  await Funding.create({ user_id: params.user_id, post_id: params.post_id });
};
