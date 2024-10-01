import * as XLSX from "xlsx";
// import Logo from "assets/iSend.svg";
import { styled } from "@mui/styles";
import { Button } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import * as FileSaver from "file-saver";
import { useReactTable } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { pdf, Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";

import DocumentDownloadIcon from "App/components/Icon/DocumentDownloadIcon";

const StyledButton = styled(Button)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
    fontWeight: 600,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
    },
}));

const exportFormats = {
    PDF: "pdf",
    XLSX: "xlsx",
};

const ExportUpload = ({ columns, data, filename, apiEndpoint, filterQuery, paginationData }) => {
    const dispatch = useDispatch();

    const { response, loading, success } = useSelector((state) => state.download_report);

    const memoizedData = useMemo(() => data, [data]);

    const memoizedColumns = useMemo(() => columns, [columns]);

    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            width: 140,
            maxWidth: 200,
        }),
        [],
    );

    const downloadFilename = filename ?? "download_" + new Date().toISOString();

    const { getAllColumns } = useReactTable({
        columns: memoizedColumns,
        defaultColumn,
        data: memoizedData,
    });

    const handleXLSXDownload = (exportData) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, downloadFilename + ".xlsx");
    };

    const handlePDFDownload = async (exportData, headerColumns) => {
        const blob = await pdf(<PdfDocument title={filename} columns={headerColumns} data={exportData} />).toBlob();
        FileSaver.saveAs(blob, downloadFilename + ".pdf");
    };

    const handleExport = (exportType) => {
        const headerColumns = getAllColumns().filter((col) => col.columnDef.header !== "Actions");
        const exportData = response?.data.map((row) => {
            let rowData = {};
            headerColumns.forEach((col) => {
                if (typeof col.accessorFn === "function") {
                    rowData[col.columnDef.header] = col.accessorFn(row) ?? "";
                } else {
                    rowData[col.columnDef.header] = row[col.id] ?? "";
                }
            });
            return rowData;
        });

        switch (exportType) {
            case exportFormats.XLSX:
                handleXLSXDownload(exportData);
                break;
            case exportFormats.PDF:
                handlePDFDownload(exportData, headerColumns);
                break;
            default:
                console.error("Invalid file export");
        }
    };

    const handleDownload = () => {
        dispatch({
            type: "DOWNLOAD_REPORT",
            path: apiEndpoint,
            query: { ...filterQuery, page_size: paginationData?.page_size * paginationData?.total_count || 100 },
        });
    };

    useEffect(() => {
        handleDownload();
    }, []);

    return (
        <>
            <StyledButton endIcon={<DocumentDownloadIcon />} onClick={() => handleExport(exportFormats.PDF)}>
                PDF
            </StyledButton>
            <StyledButton endIcon={<DocumentDownloadIcon />} onClick={() => handleExport(exportFormats.XLSX)}>
                Excel
            </StyledButton>
        </>
    );
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        fontFamily: "Helvetica",
        fontSize: 10,
        paddingVertical: "22 20",
        paddingHorizontal: 20,
        lineHeight: 1.2,
        flexDirection: "column",
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 5,
        backgroundColor: "#bff0fd",
        fontStyle: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 5,
        paddingTop: 5,
    },
    tableCol: {
        width: "25%",
        textAlign: "left",
        paddingLeft: 5,
    },
    text: {
        fontSize: 10,
    },
    logo: {
        width: 85,
        height: 76,
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        fontSize: 13,
        flexDirection: "row",
        justifyContent: "center",
    },
});

const PdfDocument = ({ title, columns, data }) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" wrap style={styles.page}>
                {/* <Image style={styles.logo} src={Logo} /> */}

                <View wrap={false} style={styles.title}>
                    <Text>{title ? title : "Report"}</Text>
                </View>
                <View style={styles.tableHeader}>
                    {columns.map((col, idx) => (
                        <View style={styles.tableCol} key={idx}>
                            <Text>{col.columnDef.header}</Text>
                        </View>
                    ))}
                </View>
                {data.map((row, rowIndex) => (
                    <View style={styles.tableRow} key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <View style={styles.tableCol} key={colIndex}>
                                <Text>{row[col.columnDef.header]}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default ExportUpload;
