import { Op } from 'sequelize';
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

export const checkFundingExpired = async (): Promise<[number, Funding[]] | null> => {
  const militime = Date.parse(new Date().toString()) - 7 * 24 * 3600 * 1000;
  const datetime = new Date(militime);

  const expiredCheck = await Funding.update(
    { is_expired: true },
    { where: { created_at: { [Op.lt]: datetime } } },
  );
  return expiredCheck;
};
