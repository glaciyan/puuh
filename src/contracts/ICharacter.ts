import { IBaseCharacter } from "./IBaseCharacter";

export interface ICharacter extends IBaseCharacter {
  local: string;
  commonGroup: string;
  boss: string;
  gemGroup: string;
  bookGroup: string;
  weekly: string;
}
