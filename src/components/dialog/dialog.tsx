import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { blue } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { falschState } from '@/src/state/falschState';
import { optionenState } from '@/src/state/optionenState';
import { splittedWortState } from '@/src/state/splittedWortState';
import { eingabeState } from '@/src/state/eingabeState';

import "@/src/components/dialog/dialog.css";

const optionen = ['Weiterspielen', 'Neustarten'];


export type SimpleDialogProps = {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            style={{
                position: "absolute",
                top: "190px"
            }}>
            <DialogTitle>Bitte eine Option wählen</DialogTitle>
            <List sx={{ pt: 0 }}>
                {optionen.map((option) => (
                    <ListItem disablePadding key={option}>
                        <ListItemButton onClick={() => handleListItemClick(option)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PlayCircleFilledWhiteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={option} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useAtom(optionenState);
    const [falsch] = useAtom(falschState);
    const [splittedWort] = useAtom(splittedWortState);
    const [eingabe] = useAtom(eingabeState);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() => {
        if (splittedWort.includes("_") === false || falsch >= 11) {
            setTimeout(handleClickOpen, 750);
        };
    }, [eingabe, falsch, splittedWort]);

    console.log(selectedValue);


    return (
        <Box
            className='dialog'>
            <div >
                <Button variant='outlined' onClick={handleClickOpen} aria-hidden="false">
                    Optionen
                </Button>

                <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />
                <div>
                    {selectedValue}
                </div>
            </div>
        </Box>
    );
}
