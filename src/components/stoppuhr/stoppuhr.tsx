/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTimer } from "use-timer";
import { useAtom, useAtomValue } from "jotai";
import { eingabeState } from "@/src/state/eingabeState";
import { splittedWortState } from "@/src/state/splittedWortState";
import { falschState } from "@/src/state/falschState";
import { initZeitState, zeitState } from "@/src/state/zeitState";

import "./stoppuhr.css";


export const Stoppuhr = () => {
    const [eingabe] = useAtom(eingabeState);
    const [splittedWort] = useAtom(splittedWortState);
    const [falsch] = useAtom(falschState);
    const [zeit, setZeit] = useAtom(zeitState);
    const initZeit = useAtomValue(initZeitState);

    const { time, start, pause } = useTimer();


    useEffect(() => {
        if (eingabe) {
            start();
        } else if (splittedWort.includes("_") === false || falsch >= 11) {
            pause();
        }
    }, [eingabe]);

    useEffect(() => {
        if (initZeit >= time) {
            setZeit(time + initZeit);
        } else {
            setZeit(zeit + 1);
        }
    }, [time, initZeit]);

    return (
        <>
            <p className="stoppuhr">
                Zeit: {zeit} Sekunden
            </p>
        </>
    );
};
