import { User } from './User';

export interface Result {
  idResult: string;
  idUser: string;
  idHistory: string;
  points: string;
  dateRegister: Date;
  state: number;
  idHistory2?: History;
  idUser2?: User;
}
