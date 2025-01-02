import React from "react";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

const DocumentFileTable = ({ rows }) => {
    return (
        <TableContainer sx={{ borderRadius: "8px" }}>
            <Table>
                <TableBody>
                    {rows?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ width: "40%" }}>
                                <Typography variant="subtitle1" fontWeight="500">
                                    {row.label}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{row.value}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DocumentFileTable;
