import { Operators } from './Operators';
import { SupportLanguages } from './SupportLanguages';

export interface ReqOperatorsDto {
    operator: Operators;
    languages: Array<SupportLanguages>;
}
