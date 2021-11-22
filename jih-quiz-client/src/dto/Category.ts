import { History } from './History';
export interface Category {
  idCategory: string;
  title: string;
  description: string;
  state: number;
  histories?: History[];
}
