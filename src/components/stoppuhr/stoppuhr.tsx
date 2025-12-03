import React, { useEffect } from "react";
import { useTimer } from "use-timer";
import { useAtom } from "jotai";
import { eingabeState } from "@/src/state/eingabeState";
import { splittedWortState } from "@/src/state/splittedWortState";
import { falschState } from "@/src/state/falschState";

import "./stoppuhr.css";


export const Stoppuhr = () => {
    const [eingabe, setEingabe] = useAtom(eingabeState);
    const [splittedWort, setSplittedWort] = useAtom(splittedWortState);
    const [falsch, setFalsch] = useAtom(falschState);


    const { time, start, pause, reset, status } = useTimer();


    useEffect(() => {
        if (eingabe) {
            start();
        } else if (splittedWort.includes("_") === false || falsch >= 11) {
            pause();
        }
    }, [eingabe]);


    return (
        <>
            <p className="stoppuhr">
                Zeit: {time} Sekunden
            </p>
        </>
    );
};
