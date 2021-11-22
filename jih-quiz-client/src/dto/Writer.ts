import { History } from './History';

export interface Writer {
  idWriter: string;
  name: string;
  lastNabme: string;
  email: string;
  password: string;
  dateRegister: Date;
  state: number;
  histories?: History[];
}
