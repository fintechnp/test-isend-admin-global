import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Page, Document, StyleSheet, View, Text, Image } from "@react-pdf/renderer";

import Table from "./PdfTable";
import dateUtils from "App/utils/dateUtils";
import logo from "../../../../../assets/isend_logo.png";
import DocumentDownloadIcon from "App/components/Icon/DocumentDownloadIcon";

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

const StyledButton = styled(Button)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
    fontWeight: 600,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
    },
}));

export const PdfDocument = ({ csvReport, customPdfTable }) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" wrap style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <View wrap={false} style={styles.title}>
                    <Text>{csvReport?.title ? csvReport?.title : "Report"}</Text>
                </View>
                <View wrap={false} style={styles.invoiceDateContainer}>
                    <Text>
                        {csvReport?.start
                            ? `From  ${dateUtils.getFormattedDate(csvReport?.start, "MM/DD/YY")}`
                            : "From"}
                        {" - "}

                        {csvReport?.end ? ` To  ${dateUtils.getFormattedDate(csvReport?.end, "MM/DD/YY")}` : "To"}
                    </Text>
                </View>
                {customPdfTable ? customPdfTable : <Table csvReport={csvReport} />}
                <Text
                    style={styles.page_number}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};

const ExportToPdf = ({ setDown, downloadData, handleClose, menu = false, downloading, children }) => {
    const fetchData = () => {
        setDown("pdf");
        downloadData();
        if (handleClose && typeof handleClose === "function") handleClose();
    };

    return (
        <>
            {menu ? (
                <MenuItem onClick={fetchData} disableRipple>
                    <PictureAsPdfIcon />
                    PDF
                </MenuItem>
            ) : (
                <StyledButton endIcon={<DocumentDownloadIcon />} onClick={fetchData} disabled={downloading}>
                    {children}
                </StyledButton>
            )}
        </>
    );
};

export default ExportToPdf;
