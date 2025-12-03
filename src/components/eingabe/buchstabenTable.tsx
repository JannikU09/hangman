"use client"

import { useAtom } from "jotai";
import { buchstabeState } from "@/src/state/buchstabeState";
import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table"
import { Box } from "@mui/material";
import { FC } from "react";

type Buchstaben = {
    value: string
}

export const BuchstabenTable: FC = () => {

    const [buchstabenList, setBuchstabenList] = useAtom(buchstabeState);

    const columns = useMemo<MRT_ColumnDef<Buchstaben>[]>(
        () => [
            {
                id: "buchstaben",
                accessorKey: "value",
                header: "Falsche Buchstaben:",
                size: 50,
                Cell: ({ cell, renderedCellValue }) => (
                    <Box
                        key={cell.getValue<string>()}
                        sx={{
                            fontSize: 20,
                            fontFamily: "Times New Roman",
                            textTransform: "uppercase",
                            width: "100%",
                            height: "100 vh",
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {renderedCellValue}
                    </Box>

                ),
                Header: ({ header, column }) => {

                    return (
                        <Box
                            key={header.id}
                            sx={{
                                fontSize: 22.5,
                                fontFamily: "Times New Roman",
                                width: "100%",
                                height: "100 vh",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            {header.column.columnDef.header}
                        </Box>
                    )
                }
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: buchstabenList,
        initialState: {
            density: "compact",
            sorting: [
                {
                    id: 'buchstaben',
                    desc: false
                }
            ],
            pagination: {
                pageSize: 15,
                pageIndex: 0
            }
        },

    });

    return (

        <div
            style={{
                position: "absolute",
                top: "105px",
                width: '100%',
                paddingLeft: "1050px",
                paddingRight: "50px",
                zIndex: -1
            }}
        >
            <MaterialReactTable
                table={table}
            />
        </div>

    )

}
