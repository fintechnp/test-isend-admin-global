import React, { useMemo, memo, useLayoutEffect, Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import MuiTable from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableContainer from "@mui/material/TableContainer";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

import SubComponent from "./SubComponet";
import TableBodySkeleton from "./TableBodySkeleton";

import useDragScroll from "App/hooks/useDragScroll";

const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
    overflowX: "auto",
}));

const GlobalTable = styled(MuiTable)(({ theme }) => ({
    // head customization
    "& .MuiTableHead-root": {
        "& .MuiTableCell-root": {
            background: theme.palette.background.primarySecond,
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
            fontSize: "1rem",
            fontWeight: 500,
            "& .MuiTypography-root": {
                color: theme.palette.text.primary,
            },
        },
        "& .MuiTableCell-root:not(:first-of-type):not(:last-of-type)": {
            border: `1px solid ${theme.palette.stroke.base}`,
            borderTop: 0,
        },
    },
    "& .MuiTableBody-root": {
        "& .MuiTableCell-root": {
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
            fontSize: "1rem",
        },
        "& .MuiTableCell-root:not(:first-of-type):not(:last-of-type)": {
            border: `1px solid ${theme.palette.stroke.base}`,
            borderTop: 0,
        },
        "& .MuiTableRow-root[aria-expanded]": {
            "& .MuiTableCell-root": {
                border: "none",
                margin: 0,
                padding: 0,
            },
        },
        '& .MuiTableRow-root[aria-expanded="true"]': {
            borderBottom: `1px solid ${theme.palette.border.light}`,
        },
    },
}));

const TableHead = styled(MuiTableHead)(({ theme, value }) => ({
    borderRadius: "6px",
    "& .MuiTableCell-root": {
        textAlign: value > 1 ? "center" : "left",
    },
}));

const TableCellFixedRight = styled(TableCell)({
    position: "sticky",
    right: 0,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
});

const StickyColumnLeft = styled(TableCell)({
    position: "sticky",
    left: 0,
    backgroundColor: "white",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
});

const TanstackReactTable = ({
    columns,
    data,
    defaultHiddenColumns,
    title,
    group,
    loading,
    sub_columns,
    handleDelete,
    handleEdit,
    enableExpand = true,
    enableRowSelect,
    renderPagination,
    renderTableFooter,
    handleForgotPassword,
    noDataMessage,
}) => {
    const memoizedColumns = useMemo(() => columns, [columns]);

    const memoizedData = useMemo(() => data, [data]);

    const table = useReactTable({
        columns: memoizedColumns ?? [],
        data: memoizedData ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    const renderTableBody = () => {
        if (loading) return <TableBodySkeleton columnCount={memoizedColumns.length} rowCount={10} />;

        if (memoizedData.length <= 0)
            return (
                <TableRow>
                    <TableCell colSpan={memoizedColumns.length} align="center">
                        {noDataMessage ?? "No Data available"}
                    </TableCell>
                </TableRow>
            );

        return table.getRowModel().rows.map((row, index) => {
            return (
                <Fragment key={index}>
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            if (cell?.column?.id === "TABLE_ACTION_COLUMN_ID") {
                                return (
                                    <TableCellFixedRight
                                        sx={{
                                            background: (theme) => theme.palette.background.paper,
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                        key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCellFixedRight>
                                );
                            }

                            if (cell?.column?.id === "TABLE_CHECKBOX_SELECT_CHECKBOX_ID") {
                                return (
                                    <StickyColumnLeft
                                        sx={{
                                            background: (theme) => theme.palette.background.paper,
                                        }}
                                        key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </StickyColumnLeft>
                                );
                            }
                            return (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                    <TableRow aria-expanded={row.getIsExpanded()}>
                        <TableCell colSpan={memoizedColumns.length}>
                            <SubComponent
                                index={row.index}
                                title={title}
                                checked={row.getIsExpanded()}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                sub_data={row?.original}
                                sub_columns={sub_columns}
                                handleForgotPassword={handleForgotPassword}
                                toggleRowExpanded={() => row.toggleExpanded()}
                            />
                        </TableCell>
                    </TableRow>
                </Fragment>
            );
        });
    };

    const dragScrollRef = useDragScroll();

    return (
        <TableContainer ref={dragScrollRef}>
            <GlobalTable>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            sx={{
                                marginTop: group ? "0px" : "2px",
                                borderTop: group ? "1px solid #fff" : "0px",
                                borderRadius: group ? "0px" : "6px",
                                backgroundColor: "primary.main",
                            }}
                        >
                            {headerGroup.headers.map((header) => {
                                if (header?.id === "TABLE_ACTION_COLUMN_ID") {
                                    return (
                                        <TableCellFixedRight
                                            key={header.id}
                                            sx={{
                                                background: (theme) => theme.palette.primary.main,
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                paddingRight: "2.5rem",
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableCellFixedRight>
                                    );
                                }

                                if (header?.id === "TABLE_CHECKBOX_SELECT_CHECKBOX_ID") {
                                    return (
                                        <StickyColumnLeft
                                            key={header.id}
                                            sx={{
                                                background: (theme) => theme.palette.primary.main,
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </StickyColumnLeft>
                                    );
                                }

                                return (
                                    <TableCell key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>{renderTableBody()}</TableBody>
            </GlobalTable>
            {!loading && memoizedData.length > 0 && renderPagination ? renderPagination() : null}
        </TableContainer>
    );
};

export default memo(TanstackReactTable);

TanstackReactTable.propTypes = {
    defaultHiddenColumns: PropTypes.arrayOf(PropTypes.string),
    columns: PropTypes.array.isRequired,
};
