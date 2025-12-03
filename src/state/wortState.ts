import { atomWithStorage } from "jotai/utils";

export const wortState = atomWithStorage("wortState", <string>(""));
