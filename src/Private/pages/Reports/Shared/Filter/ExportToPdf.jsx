import React from "react";
import MenuItem from "@mui/material/MenuItem";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
    Page,
    Document,
    StyleSheet,
    View,
    Text,
    Image,
} from "@react-pdf/renderer";

import logo from "../../../../../assets/isend_logo.png";
import Table from "./PdfTable";

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

export const PdfDocument = ({ csvReport }) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" wrap style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <View wrap={false} style={styles.title}>
                    <Text>
                        {csvReport?.title ? csvReport?.title : "Report"}
                    </Text>
                </View>
                <View wrap={false} style={styles.invoiceDateContainer}>
                    <Text>
                        {csvReport?.start ? csvReport?.start : "From"} -{" "}
                        {csvReport?.end ? csvReport?.end : "To"}{" "}
                    </Text>
                </View>
                <Table csvReport={csvReport} />
                <Text
                    style={styles.page_number}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );
};

const ExportToPdf = ({ setDown, downloadData, handleClose }) => {
    const fetchData = () => {
        setDown("pdf");
        downloadData();
        handleClose();
    };

    return (
        <MenuItem onClick={fetchData} disableRipple>
            <PictureAsPdfIcon />
            PDF
        </MenuItem>
    );
};

export default ExportToPdf;
