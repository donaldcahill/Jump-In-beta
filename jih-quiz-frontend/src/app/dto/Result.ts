import { User } from "./User";
import { History } from "./History";
export interface Result {
  idResult: string;
  idUser: string;
  idHistory: string;
  points: string;
  dateRegister: Date;
  state: boolean;
  idHistory2: History;
  idUser2: User;
}
