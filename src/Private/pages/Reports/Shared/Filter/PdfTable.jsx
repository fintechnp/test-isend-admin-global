import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import {
    CurrencyName,
    FormatDate,
    FormatNumber,
} from "./../../../../../App/helpers";

const styles = StyleSheet.create({
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
        justifyContent: "space-between",
    },
    cellContainer: {
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    row: {
        width: "100%",
        height: 24,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    serial: {
        paddingLeft: "6px",
    },
    head: {
        paddingRight: "6px",
        paddingLeft: "8px",
        textAlign: "center",
    },
    rowMail: {
        paddingLeft: "8px",
        textAlign: "center",
    },
    cellSn: {
        width: "4%",
        paddingLeft: "8px",
        textAlign: "left",
    },
    cell: {
        paddingLeft: "8px",
        textAlign: "left",
    },
    cellMail: {
        width: "11%",
        paddingLeft: "8px",
        textAlign: "left",
    },
});

const PdfTable = ({ csvReport, ReportsDownload }) => {
    const apiData = React.useMemo(() => csvReport, [csvReport?.data]);

    return (
        <View style={styles.tableContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.serial}>SN</Text>
                {apiData?.headers &&
                    apiData?.headers.map((header, index) => {
                        if (header?.key === "email") {
                            return (
                                <View style={styles.rowMail} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        } else {
                            return (
                                <View style={styles.head} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        }
                    })}
            </View>
            <View style={styles.cellContainer}>
                {ReportsDownload &&
                    ReportsDownload.length >= 0 &&
                    ReportsDownload.map((customer, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.cellSn}>{index + 1}</Text>
                                {apiData?.headers &&
                                    apiData?.headers.map((header, index) => {
                                        if (
                                            header?.key === "date_of_birth" ||
                                            header?.key === "created_ts"
                                        ) {
                                            return (
                                                <View
                                                    style={styles.head}
                                                    key={index}
                                                >
                                                    <Text>
                                                        {customer[header?.key]
                                                            ? FormatDate(
                                                                  customer[
                                                                      header
                                                                          ?.key
                                                                  ]
                                                              )
                                                            : "n/a"}
                                                    </Text>
                                                </View>
                                            );
                                        } else if (header?.key === "email") {
                                            return (
                                                <View
                                                    style={styles.cellMail}
                                                    key={index}
                                                >
                                                    <Text>
                                                        {customer[header?.key]
                                                            ? customer[
                                                                  header?.key
                                                              ]
                                                            : "n/a"}
                                                    </Text>
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <View
                                                    style={styles.head}
                                                    key={index}
                                                >
                                                    <Text>
                                                        {customer[header?.key]
                                                            ? customer[
                                                                  header?.key
                                                              ]
                                                            : "n/a"}
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    })}
                            </View>
                        );
                    })}
            </View>
        </View>
    );
};

export default PdfTable;
