import { History } from "./History";
export interface Category {
  idCategory: string;
  title: string;
  description: string;
  state: boolean;
  histories: History[];
}
