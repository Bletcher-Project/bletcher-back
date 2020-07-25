import { Router } from 'express';
import auth from './auth';

export default () => {
  const routes = Router();
  auth(routes);

  return routes;
};
