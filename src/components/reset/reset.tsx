import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

import { ausgewähltState } from "@/src/state/ausgewähltState";
import { buchstabeState } from "@/src/state/buchstabeState";
import { eingabeState } from "@/src/state/eingabeState";
import { falschState } from "@/src/state/falschState";
import { initZeitState } from "@/src/state/zeitState";
import { zeitState } from "@/src/state/zeitState";
import { optionenState } from "@/src/state/optionenState";
import { richtigState } from "@/src/state/richtigState";
import { stellenState } from "@/src/state/stellenState";

export const Reset = () => {

    const [selectedValue, setSelectedValue] = useAtom(optionenState);
    const setSprache = useSetAtom(ausgewähltState);
    const setBuchstabenList = useSetAtom(buchstabeState);
    const setEingabe = useSetAtom(eingabeState);
    const setFalsch = useSetAtom(falschState);
    const setZeit = useSetAtom(zeitState);
    const setInitZeit = useSetAtom(initZeitState);
    const setRichtig = useSetAtom(richtigState);
    const setStellen = useSetAtom(stellenState);


    useEffect(() => {
        if (selectedValue === "Neustarten") {
            setSprache('de');
            setBuchstabenList([]);
            setEingabe("");
            setFalsch(0);
            setRichtig(0);
            setZeit(0);
            setInitZeit(0);
            setSelectedValue("Weiterspielen");
            setStellen([]);
        }
    }, [selectedValue, setSprache, setBuchstabenList, setEingabe, setFalsch, setRichtig, setZeit, setInitZeit, setSelectedValue, setStellen]);

    return(
        <>
        
        </>
    )
}
