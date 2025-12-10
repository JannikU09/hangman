"use client"

import React, { useEffect, useState } from "react";
import { buchstabeState } from "@/src/state/buchstabeState";
import { useAtom } from "jotai";
import { Eingabe } from "../eingabe/eingabe";
import { wortState } from "@/src/state/wortState";
import { Title } from "../title/title";
import { ausgewähltState } from "@/src/state/ausgewähltState";
import { optionenState } from "@/src/state/optionenState";


type Wort = {
    word: string,
    length: number,
    category: string,
    language: string
}


export const Words = () => {

    const [wort, setWort] = useAtom(wortState);
    const [laenge, setLaenge] = useState<number>(0);
    const [buchstabenList, setBuchstabenList] = useAtom(buchstabeState);
    const [sprache, setSprache] = useAtom(ausgewähltState);
    const [selectedValue, setSelectedValue] = useAtom(optionenState)


    useEffect(() => {

        const superWortFetch = async () => {
            try {
                const antwort = await fetch(`https://random-words-api.kushcreates.com/api?language=${sprache}&type=uppercase&words=1`);
                const daten = await antwort.json() as Wort[];

                if (daten.length === 0) {
                    superWortFetch();
                };

                console.log("Daten: ", daten);
                return daten[0]

            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error)
                };
            };
        };
        console.log("Test", selectedValue);

        const superWort = async () => {
            try {
                const daten = await superWortFetch();
                if (!daten || daten.length > 15 || daten.word.includes(" ")) {
                    await superWort();
                    return;
                };

                //Wort und Länge werden gesetzt.
                setWort(daten.word);
                setLaenge(daten.length);


            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error);
                };
            };
        };
        superWort();


    }, [sprache, selectedValue]);

    useEffect(() => {
        setWort(wort.replace(/ß/g, "SS"));
    }, [wort]);

    console.log("Buchstaben: ", buchstabenList);
    console.log("Wortlänge", laenge);


    return (
        <>
            {/* <Title title={`Wort: ${wort} || Länge: ${laenge}`} size="smallTitle" /> */}
        </>
    )
};
