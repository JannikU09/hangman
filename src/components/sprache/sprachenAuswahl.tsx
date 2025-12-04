import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAtom } from 'jotai';
import { ausgewähltState } from '@/src/state/ausgewähltState';


export default function SprachenAuswahl() {
    const [sprache, setSprache] = useAtom(ausgewähltState);

    const handleChange = (event: SelectChangeEvent) => {
        const ausgewählt = event.target.value;
        setSprache(ausgewählt);
    };

    console.log("Sprache: ", sprache);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{
                width: "150px",
                margin: "15px",
                bottom: "560px",
                left: "1225px",
            }}>
                <InputLabel id="auswahlLable">Sprache</InputLabel>
                <Select
                    labelId="auswahlLable"
                    id="auswahl"
                    value={sprache}
                    label="Sparche"
                    onChange={handleChange}
                >
                    <MenuItem value={"de"}>Deutsch</MenuItem>
                    <MenuItem value={"en"}>Englisch</MenuItem>
                    <MenuItem value={"es"}>Spanisch</MenuItem>
                    <MenuItem value={"it"}>Italienisch</MenuItem>
                    <MenuItem value={"fr"}>Französisch</MenuItem>
                    <MenuItem value={"pt-br"}>Brasilianisch Portugisisch</MenuItem>
                    <MenuItem value={"hi-la"}>Hindi</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
