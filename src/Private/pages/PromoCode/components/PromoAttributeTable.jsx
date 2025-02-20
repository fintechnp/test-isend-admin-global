import * as React from "react";
import { styled } from "@mui/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Skeleton } from "@mui/material";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(2),

    "& .MuiTableCell-head": {
        backgroundColor: "#F1F7FE",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "1rem",
    },
}));

const PromoAttributeTable = ({ label, values, loading }) => {
    return (
        <StyledTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {loading ? (
                            <TableCell colSpan={label?.length}>
                                <Skeleton variant="text" />
                            </TableCell>
                        ) : (
                            label?.map((item, index) => <TableCell key={index}>{item}</TableCell>)
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {loading ? (
                            <TableCell colSpan={values?.length}>
                                <Skeleton variant="text" />
                            </TableCell>
                        ) : (
                            values?.map((value, index) => <TableCell key={index}>{value}</TableCell>)
                        )}
                    </TableRow>
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default PromoAttributeTable;
