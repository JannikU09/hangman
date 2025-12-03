import { atom } from "jotai";

type Buchstaben = {
    value: string;
}

export const buchstabeState = atom<Buchstaben[]>([]);
