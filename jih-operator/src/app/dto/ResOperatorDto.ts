import { GlobalDto } from './GlobalDto';
import { Operators } from './Operators';

export interface ResOperadorDto extends GlobalDto {
    operator: Operators;
}
