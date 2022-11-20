import { IElement } from "./contracts/IElement";
import { Elements } from "./Elements";

export const parseElement = (str: string): IElement => {
    switch (str.toLowerCase()) {
        case "pyro":
            return Elements.pyro;
        case "geo":
            return Elements.geo;
        case "hydro":
            return Elements.hydro;
        case "anemo":
            return Elements.anemo;
        case "cryo":
            return Elements.cryo;
        case "electro":
            return Elements.electro;
        case "dendro":
            return Elements.dendro;
        default:
            return Elements.neutral;
    }
};
