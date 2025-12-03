import { atomWithStorage } from "jotai/utils";

export const splittedWortState = atomWithStorage("splittedWortState", <string[]>([]));
