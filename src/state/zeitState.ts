import { atomWithStorage } from "jotai/utils";

export const zeitState = atomWithStorage("zeitState", <number>(0));

export const initZeitState = atomWithStorage("zeitState",  <number>(0));