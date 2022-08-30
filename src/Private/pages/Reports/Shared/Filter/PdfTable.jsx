import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import {
    CurrencyName,
    FormatDate,
    FormatNumber,
    CountryName,
    ReferenceName,
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
    name: {
        width: "15%",
        padding: "0px 4px",
        textAlign: "left",
        textTransform: "capitalize",
    },
    head: {
        width: "10%",
        padding: "0px 4px",
        textAlign: "left",
        textTransform: "capitalize",
    },
    headMail: {
        width: "11%",
        padding: "0px 4px",
        textAlign: "left",
        textTransform: "capitalize",
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
                                <View style={styles.headMail} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        } else if (header?.key === "first_name") {
                            return (
                                <View style={styles.name} key={index}>
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
                                                <Text
                                                    style={styles.head}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? FormatDate(
                                                              customer[
                                                                  header?.key
                                                              ]
                                                          )
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "first_name"
                                        ) {
                                            return (
                                                <Text
                                                    style={styles.name}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? customer[header?.key]
                                                        : ""}
                                                    {customer.middle_name
                                                        ? " " +
                                                          customer.middle_name +
                                                          " "
                                                        : " "}
                                                    {customer.last_name
                                                        ? customer.last_name
                                                        : ""}
                                                </Text>
                                            );
                                        } else if (header?.key === "email") {
                                            return (
                                                <Text
                                                    style={styles.headMail}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? customer[header?.key]
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "kyc_status"
                                        ) {
                                            return (
                                                <Text
                                                    style={styles.headMail}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? ReferenceName(
                                                              21,
                                                              customer[
                                                                  header?.key
                                                              ]
                                                          )
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "country") {
                                            return (
                                                <Text
                                                    style={styles.headMail}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? CountryName(
                                                              customer[
                                                                  header?.key
                                                              ]
                                                          )
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else {
                                            return (
                                                <Text
                                                    style={styles.head}
                                                    key={index}
                                                >
                                                    {customer[header?.key]
                                                        ? customer[header?.key]
                                                        : "n/a"}
                                                </Text>
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
