import { CheerioAPI } from "cheerio";
import { getText } from "../getText";
import { CharacterItemSelectors, CharacterSelectors } from "./selectors";
import { normalizedName } from "../toId";
import { parseElement } from "../parseElement";
import { parseWeapon } from "../parseWeapon";
import { CharacterItemGroups } from "../contracts/CharacterItemGroups";
import { CharacterItems } from "../contracts/CharacterItems";
import { ICharacter } from "../contracts/ICharacter";
import { Items } from "../../lib/data/Items";
import { IItem } from "../../lib/data/contracts/IItem";
import { green, lightBlue, lightYellow } from "kolorist";
import fs from "node:fs";
import https from "node:https";
import { countRarityStars } from "./countRarityStars";

export const handleCharacter = async (
    $: CheerioAPI,
): Promise<void> => {

    const character = fetchCharacter($);


    const formatted = getFormatted(character);
    console.log(formatted);
    console.warn(green("Done"));

    console.warn(green("Downloading images..."));

    const gacha =
        "https://genshin.honeyhunterworld.com" +
        $("#char_gallery a:contains('Gacha Splash')").attr("href");
    const icon =
        "https://genshin.honeyhunterworld.com" +
        $("#char_gallery a:contains('Icon')").attr("href");
    // console.warn(`Card: ${gacha}`);
    // console.warn(`Mugshot: ${icon}`);

    console.warn(green("Downloading card..."))
    https.get(gacha, (res) => {
        res.pipe(fs.createWriteStream("./card.webp"));
    });


    console.warn(green("Downloading mugshot..."))
    https.get(icon, (res) => {
        res.pipe(fs.createWriteStream(`./${character.normalizedName}.webp`));
    });

    console.warn(green("Downloaded images. Done."))
};

const getFormatted = (c: ICharacter) => {
    return `${c.normalizedName}: {
    name: "${c.name}",
    normalizedName: "${c.normalizedName}",
    element: Elements.${c.element.normalizedName},
    weaponType: WeaponTypes.${c.weaponType.normalizedName},
    rarity: ${c.rarity},
    sub: "${c.sub}",
    constellation: "${c.constellation}",
    description: "${c.description}",
    local: Items.${c.local},
    commonGroup: ItemGroups.${c.commonGroup},
    boss: Items.${c.boss},
    gemGroup: ItemGroups.${c.element.normalizedName}_gem,
    bookGroup: ItemGroups.${c.bookGroup},
    weekly: Items.${c.weekly}
},`;
};

const fetchCharacter = ($: CheerioAPI): ICharacter => {
    const name = getText($, CharacterSelectors.Name);

    console.warn(green(`Parsing ${name}...`))

    return {
        name: name,
        normalizedName: normalizedName(name),
        element: parseElement(getText($, CharacterSelectors.Element)),
        weaponType: parseWeapon(getText($, CharacterSelectors.Weapon)),
        rarity: countRarityStars($, CharacterSelectors.RarityStars),
        sub: getText($, CharacterSelectors.Sub),
        constellation: getText($, CharacterSelectors.Constellation),
        description: getText($, CharacterSelectors.Description),
        ...fetchCharacterItems($),
        ...fetchCharacterItemGroups($),
    };
};

const fetchCharacterItemGroups = ($: CheerioAPI): CharacterItemGroups => {
    return {
        commonGroup: fetchItemGroup($, CharacterItemSelectors.FirstCommon),
        bookGroup: fetchItemGroup($, CharacterItemSelectors.FirstBook),
    };
};

const fetchItemGroup = ($: CheerioAPI, selector: string) => {
    const selection = $(selector).attr("alt")
    if (!selection) throw new Error(`Failed to fetch ItemGroup (selector '${selector}')`)

    const firstName = normalizedName(selection.trim());
    console.warn(lightBlue(`Found Item for Group ${firstName}`))

    //@ts-ignore
    const group = (Items[firstName] as IItem)?.groupId as string
    if (!group) console.warn(lightYellow(`No Group found in gscale repository for '${firstName}'. Consider adding the group first.`))
    return group ?? "unknown";
};

const fetchCharacterItems = ($: CheerioAPI): CharacterItems => {
    return {
        boss: fetchItem($, CharacterItemSelectors.Boss),
        local: fetchItem($, CharacterItemSelectors.Local),
        weekly: fetchItem($, CharacterItemSelectors.Weekly),
    };
};

const fetchItem = ($: CheerioAPI, selector: string) => {
    const name = normalizedName($(selector).attr("alt")?.trim()) 
    console.warn(lightBlue(`Found Item ${name}`))
    return name;
};


