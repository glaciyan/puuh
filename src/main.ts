import axios from "axios";
import { CheerioAPI, load } from "cheerio";
import minimist from "minimist";
import { red } from "kolorist";
import ora from "ora";
import { handleCharacter } from "./crawler/character";
import { handleItem } from "./crawler/item";

async function main() {
    const argv = minimist<{}>(process.argv.slice(2), {});

    const option = ((argv._ as any)[0] as string) ?? null;
    const url = ((argv._ as any)[1] as string) ?? null;

    if (option == null) {
        console.error(red("Error: No option given"));
        printUsageAndExit();
    }
    if (url == null) {
        console.error(red("Error: No url given"));
        printUsageAndExit();
    }

    const spinner = ora("Preparing Site").start();
    try {
        if (option === "character" || option === "c") {
            const $ = await prepareSite(url);
            await handleCharacter($, spinner);
        } else if (option === "item" || option === "i") {
            const $ = await prepareSite(url);
            await handleItem($, spinner);
        } else {
            spinner.stop();
            console.error(red("Error: Invalid option"), option);
            printUsageAndExit();
        }
    } catch (error) {
        spinner.stop();
        console.error(red("Error: "), error);
        process.exit(1);
    }

    spinner.stop();

    // crawlLogger.info("Successfully fetched", url);

    // crawlLogger.info("Successfully parsed webpage");

    // const text = $("body > div > div.wp-block-columns > div:nth-child(2) > div.entry-content.wp-block-post-content > table.genshin_table.main_table > tbody > tr:nth-child(1) > td:nth-child(3)")?.first()?.text()?.trim();
    // console.log(text);
    // crawlLogger.debug("Crawl text:", text);
}

export const prepareSite = async (url: string): Promise<CheerioAPI> => {
    const { data } = await axios.get(url);
    return load(data);
};

export const printUsageAndExit = () => {
    console.error(
        red(
            "\nUsage: puuh option url\nOptions:\n - character (c)\n - item (i)\n - itemgroup (ig)"
        )
    );
    process.exit(1);
};

main().catch((e) => {
    console.log(e);
    process.exit(1);
});
