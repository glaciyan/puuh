import { CheerioAPI } from "cheerio";
import { green } from "kolorist";
import ora, { Ora } from "ora";
import { IItem as OIItem } from "../../lib/data/contracts/IItem";
import { getText } from "../getText";
import { normalizedName } from "../toId";
import { countRarityStars } from "./countRarityStars";
import { ItemSelectors } from "./selectors";
import https from "node:https";
import fs from "node:fs";

type IItem = Omit<OIItem, "category">;

export const handleItem = async (
    $: CheerioAPI,
    spinner: Ora
): Promise<void> => {
    spinner.text = "Processing Item";
    const item = fetchItem($);

    spinner.stop();
    console.log(getFormatted(item));

    console.warn(green("Done"));

    const image =
        "https://genshin.honeyhunterworld.com" +
        $(`img[alt='${item.name}']`).first().attr("src");

    const downloadSpinner = ora("Downloading images...").start();
    https.get(image, (res) => {
        res.pipe(fs.createWriteStream(`./${item.normalizedName}.webp`));
        downloadSpinner.stop();
    });
};

const getFormatted = (i: IItem) =>
    `${i.normalizedName}: {
    name: "${i.name}",
    normalizedName: "${i.normalizedName}",
    rarity: ${i.rarity},
    category: "__insert__",
},`;

const fetchItem = ($: CheerioAPI): IItem => {
    const name = getText($, ItemSelectors.Name);

    return {
        name: name,
        normalizedName: normalizedName(name),
        rarity: countRarityStars($, ItemSelectors.RarityStars),
    };
};
