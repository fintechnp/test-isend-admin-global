import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useTable } from "react-table";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableContainer from "@mui/material/TableContainer";
import FormControlLabel from "@mui/material/FormControlLabel";

import ReportExport from "./ReportExport";
import Spacer from "App/components/Spacer/Spacer";
import Button from "App/components/Button/Button";
import StyledMenu from "App/components/Menu/StyledMenu";

const TableContainer = styled(MuiTableContainer)(() => ({
    width: "calc(100vw - 370px)",
    overflowX: "auto",
}));

const TableHead = styled(MuiTableHead)(({ theme, value }) => ({
    borderRadius: "6px",
    "& .MuiTableCell-root": {
        textAlign: value > 1 ? "center" : "left",
    },
}));

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <FormControlLabel control={<Checkbox ref={resolvedRef} {...rest} />} label={"Toggle All"} />;
});

const ReportTable = ({
    columns,
    data,
    defaultHiddenColumns,
    group,
    loading,
    rowsPerPage = 10,
    hideTableHead,
    renderPagination,
    renderTableFooter,
    noDataMessage,
    filename,
    apiEndpoint,
    filterQuery,
    isDownloading,
}) => {
    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            width: 140,
            maxWidth: 200,
        }),
        [],
    );

    const memoizedColumns = useMemo(() => columns, [columns]);

    const memoizedData = useMemo(() => data, [data]);

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        toggleAllRowsSelected,
        getToggleHideAllColumnsProps,
        allColumns,
    } = useTable({
        defaultColumn,
        columns: memoizedColumns,
        data: memoizedData,
        initialState: {
            hiddenColumns: defaultHiddenColumns ?? [],
        },
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const [exportColumns, setExportColumns] = useState([]);

    useEffect(() => {
        setExportColumns(
            allColumns?.map((c) => ({
                name: c.Header,
                accessorKey: c.id,
                accessorFn: c.exportCell,
                isVisible: c.isVisible,
                pdfCellStyle: c.pdfCellStyle,
            })) ?? [],
        );
    }, [JSON.stringify(allColumns)]);

    useEffect(() => {}, [JSON.stringify(exportColumns)]);

    return (
        <>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Box display="flex" gap={2}>
                    {/* Column Visibility */}
                    <Button
                        id="toggle-column-visibility-customized-button"
                        aria-controls={open ? "toggle-column-visibility-customized-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        disableElevation
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        size="medium"
                        isLoading={loading}
                        variant="outlined"
                    >
                        Columns
                    </Button>
                    <StyledMenu
                        id="toggle-column-visibility-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "toggle-column-visibility-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                    >
                        <Box display="flex" flexDirection="column" sx={{ px: 2 }}>
                            <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                            {allColumns.map((column) => (
                                <Box key={column.id}>
                                    <FormControlLabel
                                        control={<Checkbox {...column.getToggleHiddenProps()} />}
                                        label={column.Header}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </StyledMenu>
                    {/* Export to CSV, PDF, XLSX */}
                    <ReportExport
                        filename={filename}
                        columns={exportColumns}
                        apiEndpoint={apiEndpoint}
                        filterQuery={{ ...filterQuery, page_size: 10000 }}
                        isExporting={isDownloading}
                    />
                </Box>
            </Box>
            <Spacer />
            <TableContainer>
                <Table size="small" {...getTableProps()}>
                    {!hideTableHead && (
                        <TableHead>
                            {headerGroups.map((headerGroup, index) => (
                                <TableRow
                                    key={index}
                                    {...headerGroup.getHeaderGroupProps()}
                                    sx={{
                                        marginTop: group ? "0px" : "2px",
                                        borderTop: group ? "1px solid #fff" : "0px",
                                        borderRadius: group ? "0px" : "6px",
                                        backgroundColor: "primary.main",
                                    }}
                                >
                                    {headerGroup.headers.map((column, index) => {
                                        return (
                                            <TableCell
                                                {...column.getHeaderProps()}
                                                key={index}
                                                sx={{
                                                    color: "#fff",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {column.render("Header")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>
                    )}

                    <TableBody>
                        {loading ? (
                            Array.from(new Array(+rowsPerPage)).map((headerGroup, index) => {
                                return (
                                    <TableRow {...headerGroups[0].getHeaderGroupProps()} key={index}>
                                        {columns.map((item, itemIndex) => (
                                            <TableCell
                                                {...headerGroups[0].headers[itemIndex].getHeaderProps()}
                                                key={itemIndex}
                                                sx={{ padding: "16px 8px" }}
                                            >
                                                <Skeleton />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : rows.length ? (
                            rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell, index) => {
                                            return (
                                                <TableCell
                                                    key={index}
                                                    {...cell.getCellProps()}
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {cell.render("Cell")}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} style={{ display: "table-cell" }}>
                                    <Typography variant="body2" align="center">
                                        {noDataMessage ?? "No data Found!"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!loading && rows.length && renderPagination ? renderPagination() : null}

            {Array.isArray(selectedFlatRows) && selectedFlatRows.length && renderTableFooter
                ? renderTableFooter(selectedFlatRows, toggleAllRowsSelected)
                : null}
        </>
    );
};

export default ReportTable;

ReportTable.propTypes = {
    defaultHiddenColumns: PropTypes.arrayOf(PropTypes.string),
};
