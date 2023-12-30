export const CharacterSelectors = {
    Name: "table.genshin_table.main_table > tbody > tr:nth-child(1) > td:nth-child(3)",
    Element:
        "table.genshin_table.main_table > tbody > tr:nth-child(7) > td:nth-child(2)",
    Weapon: "table.genshin_table.main_table > tbody > tr:contains('Weapon') > td:nth-child(2)",
    RarityStars:
        "table.genshin_table.main_table > tbody > tr:contains('Rarity') > td:nth-child(2) > img",
    Sub: "#char_stats > div:nth-child(2) > table > thead > tr > td:nth-child(7)",
    Constellation:
        "table.genshin_table.main_table > tbody > tr:contains('Constellation') > td:nth-child(2)",
    Description:
        "table.genshin_table.main_table > tbody > tr:contains('Description') > td:nth-child(2)",
};

export const CharacterItemSelectors = {
    Boss: "table.genshin_table.main_table > tbody > tr:contains('Character Ascension') > td:nth-child(2) > a:nth-child(5) > div > img",
    Local: "table.genshin_table.main_table > tbody > tr:contains('Character Ascension') > td:nth-child(2) > a:nth-child(6) > div > img",
    Weekly: "table.genshin_table.main_table > tbody > tr:contains('Skill Ascension') > td:nth-child(2) > a:nth-child(4) > div > img",
    FirstCommon:
        "table.genshin_table.main_table > tbody > tr:contains('Character Ascension') > td:nth-child(2) > a:nth-child(7) > div > img",
    FirstBook:
        "table.genshin_table.main_table > tbody > tr:contains('Skill Ascension') > td:nth-child(2) > a:nth-child(1) > div > img",
};

export const ItemSelectors = {
    Name: "table.genshin_table.main_table > tbody > tr:nth-child(1) > td:nth-child(3)",
    RarityStars:
        "table.genshin_table.main_table > tbody > tr:nth-child(4) > td:nth-child(2) > img",
    Image: "table.genshin_table.main_table > tbody > tr:nth-child(1) > td.rar_bg_5.hmb > img",
};
