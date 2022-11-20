import { IBaseCharacter } from "../../lib/data/contracts/IBaseCharacter";

export interface ICharacter extends IBaseCharacter {
  local: string;
  boss: string;
  weekly: string;
  commonGroup: string;
  bookGroup: string;
}
