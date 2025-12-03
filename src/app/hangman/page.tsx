"use client"

import React from "react";

import { Words } from "@/src/components/words/words";
import { Title } from "@/src/components/title/title";
import { Eingabe } from "@/src/components/eingabe/eingabe";
import { Stoppuhr } from "@/src/components/stoppuhr/stoppuhr";
import { BuchstabenTable } from "@/src/components/eingabe/buchstabenTable";
import SprachenAuswahl from "@/src/components/sprache/sprachenAuswahl";

export default function Page() {
    return (
        <>
            <Title title="Hangman" size="bigTitle" />

            <Stoppuhr/>
            <Words />
            <Eingabe />
            <BuchstabenTable />
            <SprachenAuswahl/>
        </>
    )
}
