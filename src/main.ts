import axios from "axios";
import { CheerioAPI, load } from "cheerio";
import minimist from "minimist";
import {green, red} from "kolorist";
import { handleCharacter } from "./crawler/character";
import { handleItem } from "./crawler/item";


const argv = minimist<{}>(process.argv.slice(2), {});

async function main() {
    const { option, url, item2, item3, groupName } = getArgs();

    if (option == null) {
        console.error(red("Error: No option given"));
        printUsageAndExit();
    }
    if (url == null) {
        console.error(red("Error: No url given"));
        printUsageAndExit();
    }

    try {
        if (option === "character" || option === "c") {
            const $ = await prepareSite(url);
            await handleCharacter($);
        } else if (option === "item" || option === "i") {
            if (item2 !== null && item3 !== null && groupName !== null) {
                let $ = await prepareSite(url);
                const i1 = await handleItem($, groupName);
                $ = await prepareSite(item2);
                const i2 = await handleItem($, groupName);
                $ = await prepareSite(item3);
                const i3 = await handleItem($, groupName);

                console.warn(`\nGroup Entry:\n${groupName}: {
    normalizedName: "${groupName}",
    itemIds: [Items.${i1}, Items.${i2}, Items.${i3}],
},`);
                console.warn(`\nItem Keys:\n
    | "${i1}"
    | "${i2}"
    | "${i3}"`)
            } else {
                const $ = await prepareSite(url);
                await handleItem($);
            }
        } else {
            console.error(red("Error: Invalid option"), option);
            printUsageAndExit();
        }
    } catch (error) {
        console.error(red("Error: "), error);
        process.exit(1);
    }

    // crawlLogger.info("Successfully fetched", url);

    // crawlLogger.info("Successfully parsed webpage");

    // const text = $("body > div > div.wp-block-columns > div:nth-child(2) > div.entry-content.wp-block-post-content > table.genshin_table.main_table > tbody > tr:nth-child(1) > td:nth-child(3)")?.first()?.text()?.trim();
    // console.log(text);
    // crawlLogger.debug("Crawl text:", text);
}

const getArgs = () => {
    const option = getArg(0);
    const url = getArg(1);
    const item2 = getArg(2);
    const item3 = getArg(3);
    const groupName = getArg(4);
    return { option, url, item2, item3, groupName };
};

const getArg = (index: number) => {
    return ((argv._ as any)[index] as string) ?? null;
};

const prepareSite = async (url: string): Promise<CheerioAPI> => {
    console.warn(green(`Loading ${url}`));
    const { data } = await axios.get(url);
    console.warn(green("Loaded. Parsing html..."));
    return load(data);
};

const printUsageAndExit = () => {
    console.error(
        red(
            "\nUsage: puuh option url (item2 item3 groupName)\nOptions:\n - character (c)\n - item (i)"
        )
    );
    process.exit(1);
};

main().catch((e) => {
    console.log(e);
    process.exit(1);
});
