import { Points } from './Points';
import { Result } from './Result';

export interface User {
  idUser: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateRegister: Date;
  state: number;
  points?: Points[];
  results?: Result[];
}
