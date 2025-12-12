"use client"

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { wortState } from "@/src/state/wortState";
import { ausgewähltState } from "@/src/state/ausgewähltState";
import { optionenState } from "@/src/state/optionenState";
import { Title } from "../title/title";

type Wort = {
    word: string,
    length: number,
    category: string,
    language: string
}


export const Words = () => {

    const [selectedValue] = useAtom(optionenState);
    const [wort, setWort] = useAtom(wortState);
    const [sprache] = useAtom(ausgewähltState)


    useEffect(() => {
        if (selectedValue === "Neustarten") {

            const superWortFetch = async () => {
                try {
                    const antwort = await fetch(`https://random-words-api.kushcreates.com/api?language=${sprache}&type=uppercase&words=1`);
                    const daten = await antwort.json() as Wort[];

                    if (daten.length === 0) {
                        superWortFetch();
                    };

                    console.log("Daten: ", daten);
                    return daten[0];

                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log(error);
                    };
                };
            };

            const superWort = async () => {
                try {
                    const daten = await superWortFetch();
                    if (!daten || daten.length > 15 || daten.word.includes(" ")) {
                        await superWort();
                        return;
                    };

                    //Wort wird gesetzt.
                    setWort(daten.word);

                    console.log("daten.word: ", daten.word);
                    console.log("wort: ", wort);

                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log(error);
                    };
                };
            };
            superWort();
        }
    }, [selectedValue, sprache, setWort, wort]);

    return (
        <>
            <Title title={`Wort: ${wort}`} size="smallTitle" />
        </>
    )
}
