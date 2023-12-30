import { CheerioAPI } from "cheerio";
import { green, lightBlue } from "kolorist";
import { IItem as OIItem } from "../../lib/data/contracts/IItem";
import { getText } from "../getText";
import { cleanSpecialCharacter, normalizedName } from "../toId";
import { countRarityStars } from "./countRarityStars";
import { ItemSelectors } from "./selectors";
import https from "node:https";
import fs from "node:fs";

type IItem = Omit<OIItem, "category">;

export const handleItem = async ($: CheerioAPI, groupId?: string) => {
    const item = fetchItem($);
    //@ts-ignore
    item.groupId = groupId;
    console.warn(lightBlue(`Item has group '${groupId}'`))

    console.log(getFormatted(item));

    console.warn(green("Done"));

    const imageTarget = $(`img.main_image`)
        .first()
        .attr("src");

    if (!imageTarget) throw Error("Could not find src of image");

    const image = "https://genshin.honeyhunterworld.com" + imageTarget;

    https.get(image, (res) => {
        res.pipe(fs.createWriteStream(`./${item.normalizedName}.webp`));
    });

    return item.normalizedName;
};

const getFormatted = (i: IItem) =>
    `${i.normalizedName}: {
    name: "${i.name}",
    normalizedName: "${i.normalizedName}",${i.groupId ? `\ngroupId: "${i.groupId}",` : ""}
    rarity: ${i.rarity},
    category: "__insert__",
},`;

const fetchItem = ($: CheerioAPI): IItem & { originalName: string } => {
    const name = getText($, ItemSelectors.Name);
    const cleanName = cleanSpecialCharacter(name);

    return {
        name: cleanName,
        originalName: name,
        normalizedName: normalizedName(cleanName),
        rarity: countRarityStars($, ItemSelectors.RarityStars),
    };
};
