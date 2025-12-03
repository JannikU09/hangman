import { atomWithStorage } from "jotai/utils";


export const eingabeState = atomWithStorage("eingabeState", <string>(""));
