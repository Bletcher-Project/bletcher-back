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

export const addFundingPost = async (id: number): Promise<void> => {
  await FundingPost.create({ post_id: id });
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

export const getFundingDuedate = async (postid: number): Promise<String | null> => {
  const funding = await FundingPost.findOne({
    where: {
      post_id: postid,
    },
    attributes: ['post_id', 'is_expired', 'created_at'],
    order: [['created_at', 'DESC']],
  });
  const date = new Date(funding?.getDataValue('created_at')!);
  date.setDate(date.getDate() + 7);
  const duedate = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });

  return duedate;
};
