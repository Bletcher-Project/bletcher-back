import { Op } from 'sequelize';
import Funding from '../models/funding';
import FundingPost from '../models/fundingPost';
import { IUserAction } from '../interfaces/user';

export const checkFundingExists = async (params: IUserAction): Promise<boolean> => {
  const funding: Funding | null = await Funding.findOne({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return funding != null;
};

export const addFundingCount = async (params: IUserAction): Promise<void> => {
  await Funding.create({ user_id: params.user_id, post_id: params.post_id });
};

export const addFundingPost = async (params: IUserAction): Promise<void> => {
  await FundingPost.create({ post_id: params.post_id });
};

export const checkFundingExpired = async (): Promise<[number, FundingPost[]] | null> => {
  const militime = Date.parse(new Date().toString()) - 7 * 24 * 3600 * 1000;
  const datetime = new Date(militime);
  const expiredCheck = await FundingPost.update(
    { is_expired: true },
    { where: { created_at: { [Op.lt]: datetime } } },
  );
  return expiredCheck;
};

export const getOngoingFunding = async (
  page: number = 1,
  limit: number = 10,
): Promise<FundingPost[]> => {
  const offset = limit * (page - 1);
  const fundings: FundingPost[] = await FundingPost.findAll({
    where: {
      is_expired: false,
    },
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return fundings;
};

export const getEndFunding = async (
  page: number = 1,
  limit: number = 10,
): Promise<FundingPost[]> => {
  const offset = limit * (page - 1);
  const fundings: FundingPost[] = await FundingPost.findAll({
    where: {
      is_expired: true,
    },
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return fundings;
};

export const getFundingCount = async (postid: number): Promise<number | null> => {
  const fundings = await Funding.findAndCountAll({
    where: {
      post_id: postid,
    },
    order: [['created_at', 'DESC']],
  });
  return fundings.count;
};

export const deleteFunding = async (params: IUserAction): Promise<number> => {
  const result: number = await Funding.destroy({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return result;
};
