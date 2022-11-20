import { CheerioAPI } from "cheerio";

export const getText = ($: CheerioAPI, selector: string) => {
    return $(selector)?.first()?.text()?.trim();
};
