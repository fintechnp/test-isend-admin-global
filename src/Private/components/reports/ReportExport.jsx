import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import * as FileSaver from "file-saver";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useDispatch, useSelector } from "react-redux";
import DataObjectIcon from "@mui/icons-material/DataObject";
import FormControlLabel from "@mui/material/FormControlLabel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { Page, Document, StyleSheet, View, Text, Image, pdf } from "@react-pdf/renderer";

import Logo from "assets/iSend.svg";
import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import StyledMenu from "App/components/Menu/StyledMenu";
import { CurrencyName, FormatDate, FormatNumber, CountryName, ReferenceName } from "App/helpers";

import { useConfirm } from "App/core/mui-confirm";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        fontFamily: "Helvetica",
        fontSize: 10,
        paddingTop: 22,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        lineHeight: 1.2,
        flexDirection: "column",
    },
    title: {
        fontSize: 13,
        flexDirection: "row",
        justifyContent: "center",
    },
    invoiceDateContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    logo: {
        width: 85,
        height: 76,
        marginLeft: "auto",
        marginRight: "auto",
    },
    page_number: {
        paddingTop: "8px",
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
    },
});

const exportFormats = {
    PDF: "pdf",
    CSV: "csv",
    XLSX: "xlsx",
};

export default function ReportExport({ columns, filename, apiEndpoint, filterQuery }) {
    const downloadFilename = filename ?? "download_" + " " + new Date().toISOString();

    const dispatch = useDispatch();

    const { loading, success, response } = useSelector((state) => state.download_report);

    const [exportColumns, setExportColumns] = useState(columns ?? []);

    const [activeExportContext, setActiveExportContext] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const confirm = useConfirm();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e, accessorKey) => {
        const updatedExportColumns = exportColumns.map((c) => {
            if (c.accessorKey === accessorKey) {
                return {
                    ...c,
                    isVisible: e.target.checked,
                };
            }
            return c;
        });
        setExportColumns(updatedExportColumns);
    };

    const handleCloseModal = (e) => {
        confirm({
            description: `Do you want to cancel ${activeExportContext.toUpperCase()} export`,
        }).then(() => {
            setActiveExportContext(undefined);
        });
    };

    const exportButtons = [
        {
            label: exportFormats.PDF.toUpperCase(),
            icon: <PictureAsPdfIcon />,
            onClick: () => setActiveExportContext(exportFormats.PDF),
        },
        {
            label: exportFormats.CSV.toUpperCase(),
            icon: <DataObjectIcon />,
            onClick: () => setActiveExportContext(exportFormats.CSV),
        },
        {
            label: exportFormats.XLSX.toUpperCase(),
            icon: <ListAltIcon />,
            onClick: () => setActiveExportContext(exportFormats.XLSX),
        },
    ];

    const handlePDFDownload = async () => {
        const visibleColumns = exportColumns.filter((v) => !!v.isVisible);

        const tableData =
            response?.data?.map((d) => {
                let rowData = visibleColumns.map((c) => {
                    let value;
                    if (typeof c.accessorFn === "function") {
                        value = c.accessorFn(d) ?? "";
                    } else {
                        value = d[c.accessorKey] ?? "";
                    }
                    return {
                        ...c,
                        value,
                    };
                });

                return rowData;
            }) ?? [];

        const blob = await pdf(
            <PdfDocument title={"Report"} tableHeaders={visibleColumns} data={tableData} />,
        ).toBlob();
        FileSaver.saveAs(blob, downloadFilename);
    };

    const handleCSVDownload = (exportData) => {
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
            bookType: "csv",
            type: "array",
        });
        const data = new Blob([excelBuffer], { type: "text/csv" });
        FileSaver.saveAs(data, downloadFilename + ".csv");
    };

    const handleXLSXDownload = (exportData) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, downloadFilename + ".xlsx");
    };

    const handleDownload = () => {
        dispatch({
            type: "DOWNLOAD_REPORT",
            path: apiEndpoint,
            query: filterQuery,
        });
    };

    const handleExport = () => {
        let visibleColumns = exportColumns.filter((v) => !!v.isVisible);
        const exportData =
            response?.data?.map((d) => {
                let row = {};
                visibleColumns.forEach((c) => {
                    if (typeof c.accessorFn === "function") {
                        row[c.name] = c.accessorFn(d) ?? "";
                    } else {
                        row[c.name] = d[c.accessorKey] ?? "";
                    }
                });
                return row;
            }) ?? [];

        switch (activeExportContext) {
            case exportFormats.XLSX:
                handleXLSXDownload(exportData);
                break;
            case exportFormats.CSV:
                handleCSVDownload(exportData);
                break;
            case exportFormats.PDF:
                handlePDFDownload(exportData);
                break;
            default:
                console.error("Invalid file export");
        }
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        setActiveExportContext(undefined);
    };

    useEffect(() => {
        if (success) handleExport();
    }, [success, JSON.stringify(response)]);

    useEffect(() => {
        setExportColumns(columns);
    }, [JSON.stringify(columns)]);

    return (
        <div>
            <Button
                id="export-customized-button"
                aria-controls={open ? "export-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                onClick={handleClick}
                startIcon={<SimCardDownloadOutlinedIcon />}
                size="medium"
                disabled={loading}
                variant="outlined"
            >
                {loading ? "Exporting" : "Export"}
            </Button>
            <StyledMenu
                id="export-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "export-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {exportButtons.map((exportButton, k) => (
                    <MenuItem key={k} onClick={() => (exportButton.onClick(), handleClose())} disableRipple>
                        {exportButton.icon}
                        {exportButton.label}
                    </MenuItem>
                ))}
            </StyledMenu>
            <Modal
                title={<Typography variant="h6">Export to {activeExportContext?.toUpperCase()}</Typography>}
                open={!!activeExportContext && isOpen}
                onClose={handleCloseModal}
            >
                <Box display="flex" flexDirection="column">
                    <Typography>Select columns to export</Typography>
                    <Divider />
                    <Box display="flex" flexDirection="column" sx={{ maxHeight: "80vh   ", overflowY: "scroll" }}>
                        {exportColumns?.map((col, i) => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        checked={col.isVisible}
                                        onChange={(e) => handleChange(e, col.accessorKey)}
                                    />
                                }
                                label={col.name}
                            />
                        ))}
                    </Box>
                    <Spacer />
                    <Button type="button" onClick={handleDownload} disabled={loading}>
                        {loading ? "Exporting" : `Export to ${activeExportContext?.toUpperCase()}`}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

ReportExport.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            accessorKey: PropTypes.string.isRequired,
            accessorFn: PropTypes.func,
            isVisible: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    apiEndpoint: PropTypes.string.isRequired,
    filterQuery: PropTypes.object,
    filename: PropTypes.string.isRequired,
};

ReportExport.defaultProps = {
    filterQuery: {},
};

const styles2 = StyleSheet.create({
    tableContainer: {
        margin: "12px 0px",
        borderRadius: "6px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        borderWidth: 1,
        borderColor: "#bff0fd",
    },
    headerContainer: {
        width: "100%",
        backgroundColor: "#bff0fd",
        height: 24,
        fontStyle: "bold",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    cellContainer: {
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    row: {
        width: "100%",
        minHeight: 24,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    serial: {
        width: "4%",
        paddingLeft: "6px",
        textAlign: "left",
    },
    cellSn: {
        width: "4%",
        paddingLeft: "6px",
        textAlign: "left",
    },
    // name: {
    //     flexGrow: 1,
    //     minidth: "15%",
    //     padding: "0px 4px",
    //     textAlign: "left",
    //     textTransform: "capitalize",
    // },
    // head: {
    //     minWidth: "10%",
    //     padding: "0px 4px",
    //     textAlign: "left",
    //     textTransform: "capitalize",
    // },
    // headRight: {
    //     minWidth: "10%",
    //     padding: "0px 4px",
    //     textAlign: "right",
    //     textTransform: "capitalize",
    // },
    // headMail: {
    //     minWidth: "12%",
    //     padding: "0px 4px",
    //     textAlign: "left",
    //     textTransform: "capitalize",
    // },
    // monthrow: {
    //     minHeight: 24,
    //     backgroundColor: "#fff",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "flex-start",
    // },
});

const PdfDocument = ({ title, tableHeaders, data, startDate, endDate }) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" wrap style={styles.page}>
                <Image style={styles.logo} src={Logo} />
                <View wrap={false} style={styles.title}>
                    <Text>{title ? title : "Report"}</Text>
                </View>
                <View wrap={false} style={styles.invoiceDateContainer}>
                    {startDate && endDate && (
                        <Text>
                            Date range : {startDate} - {endDate}
                        </Text>
                    )}
                </View>
                <View style={styles2.tableContainer}>
                    <View style={styles2.headerContainer}>
                        <Text style={styles2.serial}>SN</Text>
                        {tableHeaders?.map((th, k) => (
                            <View
                                key={k}
                                style={{
                                    ...th?.pdfCellStyle,
                                }}
                            >
                                <Text>{th?.name ?? ""}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles2.cellContainer}>
                        {data?.map((tr, index) => {
                            return (
                                <View style={styles2.row} key={index}>
                                    <Text style={styles2.cellSn}>{index + 1}</Text>
                                    {tr?.map((td, k) => (
                                        <View
                                            key={k}
                                            style={{
                                                ...td?.pdfCellStyle,
                                            }}
                                        >
                                            <Text>{td?.value ?? ""}</Text>
                                        </View>
                                    ))}
                                </View>
                            );
                        })}
                    </View>
                </View>
                <Text
                    style={styles.page_number}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};
