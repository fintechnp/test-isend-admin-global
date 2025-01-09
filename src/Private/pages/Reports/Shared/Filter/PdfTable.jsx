import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { CurrencyName, FormatDate, FormatNumber, CountryName, ReferenceName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";

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
        height: 32,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 8px",
    },
    row: {
        width: "100%",
        paddingVertical: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    serial: {
        width: "6%",
        paddingLeft: "6px",
        textAlign: "left",
    },
    name: {
        flexGrow: 1,
        flexBasis: "20%",
        minWidth: "12%",
        padding: "0 8px",
        textAlign: "left",
        textTransform: "capitalize",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    cellContainer: {
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
    },
    head: {
        flexBasis: "17%",
        padding: "0 8px",
        textAlign: "left",
        textTransform: "capitalize",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    headRight: {
        flexBasis: "17%",
        padding: "0 8px",
        textAlign: "right",
        textTransform: "capitalize",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    headMail: {
        flexBasis: "17%",
        padding: "0 8px",
        textAlign: "left",
        textTransform: "capitalize",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    monthrow: {
        minHeight: 32,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "4px 8px",
    },
});

const PdfTable = ({ csvReport }) => {
    const apiData = React.useMemo(() => csvReport, [csvReport?.data]);

    const handleYealyData = (head, data, index) => {
        switch (head) {
            case "months":
                return data?.txn_month ? (
                    <Text style={styles.head} key={index}>
                        {data?.txn_month}
                    </Text>
                ) : (
                    "0"
                );
            case "avg_rate":
                return data?.avg_rate ? (
                    <Text style={styles.head} key={index}>
                        {FormatNumber(data?.avg_rate.toFixed(2))}
                    </Text>
                ) : (
                    "0"
                );
            case "charge":
                return data?.charge ? (
                    <Text style={styles.head} key={index}>
                        {FormatNumber(data?.charge)}
                    </Text>
                ) : (
                    "0"
                );
            case "txn_amount":
                return data?.txn_amount ? (
                    <Text style={styles.head} key={index}>
                        {FormatNumber(data?.txn_amount)}
                    </Text>
                ) : (
                    "0"
                );
            case "txn_count":
                return data?.txn_count ? (
                    <Text style={styles.head} key={index}>
                        {data?.txn_count}
                    </Text>
                ) : (
                    "0"
                );
            default:
                return "0";
        }
    };

    return (
        <View style={styles.tableContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.serial}>SN</Text>
                {apiData?.headers &&
                    apiData?.headers.map((header, index) => {
                        if (
                            header?.key === "email" ||
                            header?.key === "country" ||
                            header?.key === "send_country" ||
                            header?.key === "payout_country"
                        ) {
                            return (
                                <View style={styles.headMail} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        } else if (
                            header?.key === "first_name" ||
                            header?.key === "agent_name" ||
                            header?.key === "customer_name" ||
                            header?.key === "bank_name" ||
                            header?.key === "agent"
                        ) {
                            return (
                                <View style={styles.name} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        } else if (
                            header?.key === "average_customer_rate" ||
                            header?.key === "payout_amount" ||
                            header?.key === "total_charge" ||
                            header?.key === "txn_cnt"
                        ) {
                            return (
                                <View style={styles.headRight} key={index}>
                                    <Text>{header?.label}</Text>
                                </View>
                            );
                        } else if (header?.key === "months") {
                            return (
                                <View style={styles.head} key={index}>
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
                {csvReport?.data &&
                    csvReport?.data.length >= 0 &&
                    csvReport?.data.map((customer, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.cellSn}>{index + 1}</Text>
                                {apiData?.headers &&
                                    apiData?.headers.map((header, index) => {
                                        if (header?.key === "date_of_birth" || header?.key === "created_ts") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? dateUtils.getFormattedDate(
                                                              customer[header?.key],
                                                              "MM/DD/YYYY hh:mm A",
                                                          )
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "first_name") {
                                            return (
                                                <Text style={styles.name} key={index}>
                                                    {customer[header?.key] ? customer[header?.key] : ""}
                                                    {customer.middle_name ? " " + customer.middle_name + " " : " "}
                                                    {customer.last_name ? customer.last_name : ""}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "agent" ||
                                            header?.key === "agent_name" ||
                                            header?.key === "customer_name" ||
                                            header?.key === "bank_name"
                                        ) {
                                            return (
                                                <Text style={styles.name} key={index}>
                                                    {customer[header?.key] ? customer[header?.key] : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "email") {
                                            return (
                                                <Text style={styles.headMail} key={index}>
                                                    {customer[header?.key] ? customer[header?.key] : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "kyc_status") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? ReferenceName(21, customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "payment_type") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? ReferenceName(1, customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "transaction_status") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? ReferenceName(66, customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "transaction_status_code") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? ReferenceName(66, customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "country" ||
                                            header?.key === "send_country" ||
                                            header?.key === "payout_country"
                                        ) {
                                            return (
                                                <Text style={styles.headMail} key={index}>
                                                    {customer[header?.key] ? CountryName(customer[header?.key]) : "n/a"}
                                                </Text>
                                            );
                                        } else if (header?.key === "collected_currency") {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key]
                                                        ? CurrencyName(customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "average_customer_rate" ||
                                            header?.key === "payout_amount" ||
                                            header?.key === "total_charge" ||
                                            header?.key === "txn_cnt"
                                        ) {
                                            return (
                                                <Text style={styles.headRight} key={index}>
                                                    {customer[header?.key]
                                                        ? FormatNumber(customer[header?.key])
                                                        : "n/a"}
                                                </Text>
                                            );
                                        } else if (
                                            header?.key === "months" ||
                                            header?.key === "avg_rate" ||
                                            header?.key === "charge" ||
                                            header?.key === "txn_amount" ||
                                            header?.key === "txn_count"
                                        ) {
                                            return (
                                                <View style={styles.monthrow}>
                                                    {customer?.month.map((each) =>
                                                        handleYealyData(header?.key, each, index),
                                                    )}
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <Text style={styles.head} key={index}>
                                                    {customer[header?.key] ? customer[header?.key] : "n/a"}
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
