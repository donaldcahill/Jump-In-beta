import { GlobalDto } from "./global.dto";
import { Writer } from "./Writer";

export interface LoginResponseDto extends GlobalDto {
  user: Writer;
}
