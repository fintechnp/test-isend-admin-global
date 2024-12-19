import React from "react";
import dateUtils from "App/utils/dateUtils";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { CountryName, ReferenceName } from "App/helpers";
import referenceTypeId from "Private/config/referenceTypeId";

export const styles = StyleSheet.create({
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
        minHeight: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 8px",
    },
    row: {
        width: "100%",
        minHeight: 32,
        paddingVertical: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
    },
    column: {
        flex: 1,
        paddingHorizontal: "2px",
        wordWrap: "break-word",
    },
    columnFixed: {
        width: "5%",
        paddingHorizontal: "2px",
    },
});

const ExportPdfTable = ({ reportData }) => {
    return (
        <View style={styles.tableContainer}>
            {/* Header Row */}
            <View style={styles.headerContainer}>
                <Text style={[styles.columnFixed]}>S.N</Text>
                <Text style={[styles.column]}>Beneficiary Details</Text>
                <Text style={[styles.column]}>Beneficiary Address</Text>
                <Text style={[styles.column]}>Relation</Text>
                <Text style={[styles.column]}>Customer Name</Text>
                <Text style={[styles.column]}>Delivery Method</Text>
                <Text style={[styles.column]}>Delivery Details</Text>
                <Text style={[styles.column]}>Created At/By</Text>
                <Text style={[styles.column]}>Updated At/By</Text>
                <Text style={[styles.column]}>Status</Text>
            </View>

            {reportData?.data.map((row, index) => (
                <View style={styles.row} key={index}>
                    <Text style={[styles.columnFixed]}>{row.f_serial_no || ""}</Text>
                    <Text style={[styles.column]}>
                        {[row?.first_name, row?.middle_name, row?.last_name].filter(Boolean).join(" ")}
                        {row?.beneficiary_id ? ` (${row?.beneficiary_id})` : ""}
                        {row?.beneficiary_mobile_number ? `\n${row?.beneficiary_mobile_number}` : ""}
                    </Text>
                    <Text style={[styles.column]}>
                        {[row?.street, row?.address, row?.city].filter(Boolean).join(" ")}
                        {row?.state ? `\n${row?.state},` : ""}
                        {row?.country ? ` ${CountryName(row?.country)}` : ""}
                    </Text>
                    <Text style={[styles.column]}>{row.relation || ""}</Text>
                    <Text style={[styles.column]}>
                        {row?.customer_name ? `${row?.customer_name} (${row?.customer_id})` : ""}
                        {row?.customer_mobile_number ? `\n${row?.customer_mobile_number}` : ""}
                    </Text>
                    <Text style={[styles.column]}>
                        {row.payment_type ? ReferenceName(referenceTypeId.paymentType, row.payment_type) : ""}
                    </Text>
                    <Text style={[styles.column]}>
                        {[row?.bank_name, row?.account_number].filter(Boolean).join(" ")}
                    </Text>
                    <Text style={[styles.column]}>
                        {row?.created_ts ? dateUtils.getFormattedDate(row?.created_ts) : ""}
                        {`${row?.created_by ? `\n${row?.created_by}` : ""}`}
                    </Text>
                    <Text style={[styles.column]}>
                        {row?.updated_ts ? dateUtils.getFormattedDate(row?.updated_ts) : ""}
                        {`${row?.updated_by ? `\n${row?.updated_by}` : ""}`}
                    </Text>
                    <Text style={[styles.column]}>{row.is_active ? "Active" : "Inactive"}</Text>
                </View>
            ))}
        </View>
    );
};

export default ExportPdfTable;
