import { CheerioAPI } from "cheerio";
import { Ora } from "ora";
import { CharacterItemGroups } from "../contracts/CharacterItemGroups";
import { CharacterItems } from "../contracts/CharacterItems";
import { ICharacter } from "../contracts/ICharacter";
import { getText } from "../getText";
import { CharacterItemSelectors, CharacterSelectors } from "../selectors";
import { normalizedName } from "../toId";
import { parseElement } from "../parseElement";
import { parseWeapon } from "../parseWeapon";

export const handleCharacter = ($: CheerioAPI, spinner: Ora): void => {
    spinner.text = "Processing Character";

    const character = fetchCharacter($);

    spinner.stop();

    console.log(character);
};

const fetchCharacter = ($: CheerioAPI): ICharacter => {
    const name = getText($, CharacterSelectors.Name);

    return {
        name: name,
        normalizedName: normalizedName(name),
        element: parseElement(getText($, CharacterSelectors.Element)),
        weaponType: parseWeapon(getText($, CharacterSelectors.Weapon)),
        rarity: countRarityStars($),
        sub: getText($, CharacterSelectors.Sub),
        constellation: getText($, CharacterSelectors.Constellation),
        description: getText($, CharacterSelectors.Description),
        ...fetchCharacterItems($),
        ...fetchCharacterItemGroups($),
    };
};

const fetchCharacterItemGroups = ($: CheerioAPI): CharacterItemGroups => {
    return {};
};

const fetchCharacterItems = ($: CheerioAPI): CharacterItems => {
    return {
        boss: normalizedName(fetchItem($, CharacterItemSelectors.Boss)!),
        local: normalizedName(fetchItem($, CharacterItemSelectors.Local)!),
        weekly: normalizedName(fetchItem($, CharacterItemSelectors.Weekly)!),
    };
};

const fetchItem = ($: CheerioAPI, selector: string) => {
    return $(selector).attr("alt")?.trim() ?? null;
};

const countRarityStars = ($: CheerioAPI): 4 | 5 => {
    const el = $(CharacterSelectors.RarityStars);

    return el.length as any;
};
