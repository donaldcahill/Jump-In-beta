import { GlobalDto } from './global.dto';
import { Writer } from 'src/model/Writer';
export interface LoginResponseDto extends GlobalDto{
    user: Writer;
}