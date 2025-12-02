import { atom } from "jotai";
import { Buchstaben } from "../models/buchstabe";

export const buchstabeState = atom<Buchstaben[]>([]);
