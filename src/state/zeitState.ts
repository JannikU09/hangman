import { atomWithStorage } from "jotai/utils";

export const zeitState = atomWithStorage("zeitState", <number>(0));
