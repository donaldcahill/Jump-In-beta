import { User } from './User';

export interface Points {
  idPoints: string;
  idUser: string;
  ammount: string;
  state: boolean | null;
  idUser2?: User;
}
