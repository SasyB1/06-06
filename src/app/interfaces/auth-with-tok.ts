import { iUser } from './user';

export interface iAuthWithTok {
  accessToken: string;
  user: iUser;
}
