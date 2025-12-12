import { atomWithStorage } from "jotai/utils";

export const stellenState = atomWithStorage("stellenState", <number[]>[]);
