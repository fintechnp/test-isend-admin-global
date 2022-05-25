import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import {
    useFlexLayout,
    useExpanded,
    usePagination,
    useRowSelect,
    useTable,
} from "react-table";

import SubComponent from "./SubComponet";

const TableContainer = styled("div")(({ theme }) => ({
    paddingTop: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(0.5),
    },
    "& .MuiCollapse-wrapper:hover": {
        background: theme.palette.primary.contrastText,
    },
    "& .MuiCollapse-wrapperInner:hover": {
        background: theme.palette.primary.contrastText,
    },
}));

const GlobalTable = styled(MuiTable)(({ theme }) => ({
    "&. MuiTableCell-root.MuiTableCell-head": {
        borderBottom: "none",
    },
}));

const HeadCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    fontSize: "16px",
    padding: "10px",
    color: theme.palette.primary.contrastText,
}));

const TableHead = styled(MuiTableHead)(({ theme }) => ({}));

const BoxContainer = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.border.light}`,
    "& :hover": {
        background: theme.palette.background.light,
    },
}));

const Table = ({
    columns,
    data,
    title,
    loading,
    sub_columns,
    handleDelete,
    handleEdit,
    enableRowSelect,
    rowsPerPage = 10,
    hideTableHead,
    renderPagination,
    renderTableFooter,
}) => {
    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 200,
        }),
        []
    );

    const memoizedColumns = useMemo(() => columns, [columns]);

    const memoizedData = useMemo(() => data, [data]);

    const usePaginationHook = renderPagination ? usePagination : "";
    const useRowSelectHook = enableRowSelect ? useRowSelect : "";

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        toggleAllRowsSelected,
        toggleRowExpanded,
    } = useTable(
        {
            defaultColumn,
            columns: memoizedColumns,
            data: memoizedData,
        },
        useFlexLayout,
        useExpanded,
        usePaginationHook,
        useRowSelectHook
    );

    return (
        <TableContainer>
            <div>
                <GlobalTable {...getTableProps()}>
                    {!hideTableHead && (
                        <TableHead>
                            {headerGroups.map((headerGroup, index) => (
                                <TableRow
                                    key={index}
                                    {...headerGroup.getHeaderGroupProps()}
                                    sx={{
                                        marginTop: "2px",
                                        borderRadius: "6px",
                                        backgroundColor: "primary.dark",
                                    }}
                                >
                                    {headerGroup.headers.map(
                                        (column, index) => {
                                            return (
                                                <HeadCell
                                                    {...column.getHeaderProps()}
                                                    key={index}
                                                >
                                                    {column.render("Header")}
                                                </HeadCell>
                                            );
                                        }
                                    )}
                                </TableRow>
                            ))}
                        </TableHead>
                    )}
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(+rowsPerPage)).map(
                                (headerGroup, index) => {
                                    return (
                                        <TableRow
                                            {...headerGroups[0].getHeaderGroupProps()}
                                            key={index}
                                        >
                                            {columns.map((item, itemIndex) => (
                                                <TableCell
                                                    {...headerGroups[0].headers[
                                                        itemIndex
                                                    ].getHeaderProps()}
                                                    key={itemIndex}
                                                    sx={{ padding: "16px 8px" }}
                                                >
                                                    <Skeleton />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                }
                            )
                        ) : rows.length ? (
                            rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <BoxContainer key={i}>
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map((cell, index) => {
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        {...cell.getCellProps()}
                                                        sx={{
                                                            padding:
                                                                "14px 10px",
                                                            borderBottom:
                                                                "none",
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        {cell.render("Cell")}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                        {/* {row.isExpanded ? ( */}
                                        <SubComponent
                                            index={row.index}
                                            title={title}
                                            checked={row?.isExpanded}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            sub_data={row?.original}
                                            sub_columns={sub_columns}
                                            toggleRowExpanded={
                                                toggleRowExpanded
                                            }
                                        />
                                        {/* ) : null} */}
                                    </BoxContainer>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell style={{ display: "table-cell" }}>
                                    <Typography variant="body2" align="center">
                                        No data Found!
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </GlobalTable>
            </div>

            {!loading && rows.length && renderPagination
                ? renderPagination()
                : null}

            {Array.isArray(selectedFlatRows) &&
            selectedFlatRows.length &&
            enableRowSelect &&
            renderTableFooter
                ? renderTableFooter(selectedFlatRows, toggleAllRowsSelected)
                : null}
        </TableContainer>
    );
};

export default Table;
