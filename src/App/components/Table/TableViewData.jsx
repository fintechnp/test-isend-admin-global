import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import MuiTableContainer from "@mui/material/TableContainer";

const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
    "& .MuiTableHead-root": {
        ".MuiTableCell-root": {
            background: theme.palette.primary.main,
            color: theme.palette.background.paper,
        },
        "& th:first-of-type": {
            borderRadius: "6px 6px 0 0",
        },
    },
    "& .MuiTableBody-root .MuiTableCell-root:first-of-type": {
        fontWeight: "500",
    },
}));

export default function TableViewData({ isLoading, views, data }) {
    return (
        <TableContainer>
            {views.map((viewData) => {
                if (React.isValidElement(viewData)) return viewData;
                else if (Object.prototype.toString.call(viewData) === "[object Object]") {
                    return (
                        <Table size="small">
                            {viewData.tableTitle && (
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2}>{viewData.tableTitle}</TableCell>
                                    </TableRow>
                                </TableHead>
                            )}
                            <TableBody>
                                {viewData.tableData.map((td) => (
                                    <TableRow>
                                        <TableCell>{td.label}</TableCell>
                                        <TableCell>
                                            {isLoading ? (
                                                <Skeleton sx={{ width: "200px" }} />
                                            ) : Object.prototype.toString.call(td.cell) !== "[object Undefined]" ? (
                                                td.cell(data)
                                            ) : (
                                                data[td.accessor]
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    );
                } else if (Object.prototype.toString.call(viewData) === "[object String]") {
                    return <Typography>{viewData}</Typography>;
                } else {
                    return viewData;
                }
            })}
        </TableContainer>
    );
}

TableViewData.propTypes = {
    views: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.any,
            PropTypes.shape({
                tableTitle: PropTypes.string,
                tableData: PropTypes.shape({
                    label: PropTypes.string,
                    accessor: PropTypes.string,
                    cell: PropTypes.func,
                }),
            }),
        ]),
    ).isRequired,
    data: PropTypes.object,
};
