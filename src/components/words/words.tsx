"use client"

import React from "react";
import { useEffect, useState } from "react";
import { buchstabeState } from "@/src/state/buchstabeState";
import { useAtom } from "jotai";
import { Eingabe } from "../eingabe/eingabe";
import { wortState } from "@/src/state/wortState";
import { Title } from "../title/title";
import { ausgewähltState } from "@/src/state/ausgewähltState";


interface Wort {
    word: string,
    length: number,
    category: string,
    language: string
}


export const Words = () => {

    const [wort, setWort] = useAtom(wortState);
    const [laenge, setLaenge] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [buchstabenList, setBuchstabenList] = useAtom(buchstabeState);
    const [anzahl, setAnzahl] = useState<number>(1);
    const [sprache, setSprache] = useAtom(ausgewähltState);


    useEffect(() => {

        const superWortFetch = async () => {
            try {
                const antwort = await fetch(`https://random-words-api.kushcreates.com/api?language=${sprache}&type=uppercase&words=1`);
                const daten = await antwort.json() as Wort[];

                if (daten.length === 0) {
                    superWortFetch();
                }

                console.log("Daten: ", daten);
                return daten[0]

            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error)
                }
            }
        };

        const superWort = async () => {
            try {
                const daten = await superWortFetch();

                if (!daten || daten.length > 15) {
                    await superWort();
                    return;
                }

                //Wort und Länge werden gesetzt.
                setWort(daten.word);
                setLaenge(daten.length);


            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error);
                }
            } finally {
                setLoading(false);
            }
        };
        superWort();

    }, [sprache]);

    useEffect(() => {
        setWort(wort.replace(/ß/g, "SS"));
    }, [wort]);

    const mehrere = wort.includes(" ");

    useEffect(() => {
        setAnzahl(mehrere ? 2 : 1);
        console.log("mehrere", mehrere)
    }, [mehrere]);


    console.log("Buchstaben: ", buchstabenList);
    console.log("Wortlänge", laenge);


    return (
        <>
            {/* <Title title={loading ? "Wort und Länge werden geladen..." : `Wort: ${wort} || Länge: ${laenge}`} size="smallTitle" /> */}
            <Title title={mehrere ? `${anzahl} Wörter` : `${anzahl} Wort`} size="smallTitle" />
        </>
    )
};
