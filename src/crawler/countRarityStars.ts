import { CheerioAPI } from "cheerio";

export const countRarityStars = ($: CheerioAPI, selector: string): 4 | 5 => {
    const el = $(selector);

    return el.length as any;
};
