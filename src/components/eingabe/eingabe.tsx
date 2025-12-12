"use client"

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { buchstabeState } from "@/src/state/buchstabeState";
import { Title } from "@/src/components/title/title";
import { wortState } from "@/src/state/wortState";
import { eingabeState } from "@/src/state/eingabeState";
import { splittedWortState } from "@/src/state/splittedWortState";
import { falschState } from "@/src/state/falschState";
import { richtigState } from "@/src/state/richtigState";
import { stellenState } from "@/src/state/stellenState";

import "./eingabe.css"
import "./hangmanZeichnung.css"

export const Eingabe: React.FC = ({ }) => {
    const [eingabe, setEingabe] = useAtom(eingabeState);
    const [buchstabenList, setBuchstabenList] = useAtom(buchstabeState);
    const [richtig, setRichtig] = useAtom(richtigState);
    const [falsch, setFalsch] = useAtom(falschState);
    const [stellen, setStellen] = useAtom(stellenState);
    const [wort] = useAtom(wortState);
    const [splittedWort, setSplittedWort] = useAtom(splittedWortState);


    useEffect(() => {
        const splittedWort = wort.split("").map(() => "_")
        setSplittedWort(splittedWort);
    }, [wort, setSplittedWort]);


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEingabe(event.target.value.toUpperCase());
    };

    const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>) => {
        console.log(event.key);
        if (event.key === "Enter" && eingabe !== "") {

            event.preventDefault();
            setEingabe("");

            const includes = wort.includes(eingabe);

            if (includes === true) {

                //Wenn der Buchstabe richtig ist.
                setRichtig(richtig + 1);

            } else if (includes === false) {

                //Wenn der Buchstabe falsch ist.
                if (falsch <= 11) {
                    setBuchstabenList([
                        ...buchstabenList,
                        { value: eingabe }
                    ])
                    setFalsch(falsch + 1);
                };
            }


            const indexes: number[] = [];
            let position = 0;
            while (position < wort.length) {
                const index = wort.indexOf(eingabe, position);

                if (index === -1) break;

                indexes.push(index);
                position = index + 1;
            }

            const platzhalter = [...splittedWort];
            indexes.forEach((index) => {
                platzhalter[index] = eingabe;
            });

            setSplittedWort(platzhalter);
            setStellen(indexes);

            console.log(includes);
            console.log("Eingabe: ", eingabe);
            console.log("Index: ", indexes);
            console.log("Richtig: ", richtig);
            console.log("Falsch: ", falsch + 1);
        };

    };



    return (
        <>
            <Title title={falsch < 11 ? `${splittedWort.join(" ")}` : `${wort}`} size="smallTitle" />
            <Title title={`Stelle(n): ${stellen.join(", ")}`} size="smallTitle" />
            <Title title={falsch < 11 ? `Richtig: ${richtig} || Falsch: ${falsch}/11` : "Zu viele Fehler."} size="smallTitle" />

            <div className="hangman">
                <button className="horizontal1" disabled={falsch >= 1 ? false : true} />
                <button className="vertikal1" disabled={falsch >= 2 ? false : true} />
                <button className="schräge" disabled={falsch >= 3 ? false : true} />
                <button className="horizontal2" disabled={falsch >= 4 ? false : true} />
                <button className="vertikal2" disabled={falsch >= 5 ? false : true} />
                <button className="kopf" disabled={falsch >= 6 ? false : true} />
                <button className="körper" disabled={falsch >= 7 ? false : true} />
                <button className="armLinks" disabled={falsch >= 8 ? false : true} />
                <button className="armRechts" disabled={falsch >= 9 ? false : true} />
                <button className="beinLinks" disabled={falsch >= 10 ? false : true} />
                <button className="beinRechts" disabled={falsch >= 11 ? false : true} />
            </div>


            <form onKeyDown={handleSubmit}>
                <textarea
                    value={eingabe}
                    onChange={handleChange}
                    rows={1}
                    maxLength={1}
                    placeholder="Buchstabe"
                    className="eingabeFeld"
                    disabled={falsch < 11 ? false : true}
                />
            </form>
        </>
    );
}
