import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

const borderColor = "#1761AE";
const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#bff0fd",
    },
    headerContainer: {
        width: "100%",
        borderBottomColor: "#bff0fd",
        backgroundColor: "#bff0fd",
        borderBottomWidth: 1,
        height: 24,
        fontStyle: "bold",
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    bodyContainer: {
        width: "100%",
        borderBottomColor: "#fff",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    description: {
        width: "4%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    head: {
        flexGrow: 1,
        paddingLeft: "8px",
        textAlign: "center",
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
});

const PdfTable = ({ csvReport }) => {
    return (
        <View style={styles.tableContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.description}>SN</Text>
                {csvReport &&
                    csvReport?.headers.map((header, index) => (
                        <Text style={styles.head} key={index}>
                            {header?.label}
                        </Text>
                    ))}
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.description}>SN</Text>
                {csvReport &&
                    csvReport?.data.map((header, index) => (
                        <Text style={styles.head} key={index}>
                            {header?.label}
                        </Text>
                    ))}
            </View>
        </View>
    );
};

export default PdfTable;
