import React from "react";
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
});

const PdfDocument = ({ csvReport }) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <View style={styles.title}>
                    <Text>Report on Customer</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                    <Text>2020/03/22 - 2022/08/05</Text>
                </View>
                <Table csvReport={csvReport} />
            </Page>
        </Document>
    );
};

export default PdfDocument;
