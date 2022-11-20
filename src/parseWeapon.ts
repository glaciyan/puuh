import { IWeaponType } from "../lib/data/contracts/IWeaponType";
import { WeaponTypes } from "../lib/data/WeaponTypes";

export const parseWeapon = (str: string): IWeaponType => {
    switch (str.toLowerCase()) {
        case "bow":
            return WeaponTypes.bow;
        case "sword":
            return WeaponTypes.sword;
        case "claymore":
            return WeaponTypes.claymore;
        case "catalyst":
            return WeaponTypes.catalyst;
        case "polearm":
            return WeaponTypes.polearm;
        default:
            return WeaponTypes.sword;
    }
};
