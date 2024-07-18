import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import SourceDetails from "App/core/source-detail/SourceDetails";

import isEmpty from "App/helpers/isEmpty";
import useCountries from "App/hooks/useCountries";
import { GenderStringOptions } from "App/data/Gender";
import { IS_STATE_REQUIRED } from "../schema/createCustomerSchema";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import { useReactHookFormContext } from "App/core/hook-form/useReactHookForm";
import { AUSTRALIA_ISO3, UNITED_STATES_ISO3 } from "App/data/SendingCountry";

const Wrapper = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.stroke.base}`,
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
}));

export default function CustomerFormStep4({ isAddMode }) {
    const { getValues } = useReactHookFormContext();

    const form = getValues();

    const { getCountryNameByISO3 } = useCountries();

    const definitionPersonalInformation = useSourceDetail([
        {
            title: "Customer's Personal Information",
            items: [
                {
                    label: "Full Name",
                    cell: (data) =>
                        [data.first_name, data.middle_name, data.last_name].filter((v) => !isEmpty(v)).join(" "),
                },
                {
                    label: "Gender",
                    accessorKey: "gender",
                    cell: (data) => GenderStringOptions.find((g) => g.value === data.gender).label,
                },
                {
                    label: "Date of birth",
                    accessorKey: "date_of_birth",
                },
                ...(isAddMode
                    ? [
                          {
                              label: "Mobile Number",
                              accessorKey: "mobile_number",
                          },
                          {
                              label: "Email",
                              accessorKey: "email",
                          },
                      ]
                    : []),
                {
                    label: "Birth Country",
                    cell: (data) => getCountryNameByISO3(data.birth_country),
                },
                {
                    label: "Citizenship Country",
                    cell: (data) => getCountryNameByISO3(data.citizenship_country),
                },
                {
                    label: "Occupation",
                    accessorKey: "occupation",
                },
                {
                    label: "Source of Income",
                    accessorKey: "source_of_income",
                },
                ...(form.country === UNITED_STATES_ISO3
                    ? [
                          {
                              label: "SSN Number",
                              accessorKey: "ssn_number",
                          },
                      ]
                    : []),
                ...(isAddMode
                    ? [
                          {
                              label: "Registered Agent",
                              accessorKey: "registered_agent_name",
                          },
                      ]
                    : []),
            ],
        },
    ]);

    const definitionAddressInformation = useSourceDetail([
        {
            title: "Customer's Address Information",
            items: [
                {
                    label: "Country",
                    cell: (data) => getCountryNameByISO3(data.country),
                },
                {
                    label: "Post Code",
                    accessorKey: "postcode",
                },
                {
                    label: "Unit",
                    accessorKey: "unit",
                },
                {
                    label: "Street",
                    accessorKey: "street",
                },
                ...(form.country === AUSTRALIA_ISO3
                    ? [
                          {
                              label: "Street Type",
                              accessorKey: "street_type",
                          },
                          {
                              label: "Street Number",
                              accessorKey: "street_no",
                          },
                      ]
                    : []),
                {
                    label: "City",
                    accessorKey: "city",
                },
                ...(form[IS_STATE_REQUIRED]
                    ? [
                          {
                              label: "State",
                              accessorKey: "state_name",
                          },
                      ]
                    : []),
                {
                    label: "Address",
                    accessorKey: "address",
                },
            ],
        },
    ]);

    const definitionDocumentInformation = useSourceDetail([
        {
            title: "Customer's Document Information",
            items: [
                {
                    label: "Issued Country",
                    cell: (data) => getCountryNameByISO3(data.id_issued_country),
                },
                {
                    label: "Document Type",
                    accessorKey: "id_type",
                },
                {
                    label: "Document Number",
                    accessorKey: "id_number",
                },
                {
                    label: "Issued Date",
                    accessorKey: "id_issue_date",
                },
                {
                    label: "Expiry Date",
                    accessorKey: "id_expiry_date",
                },
            ],
        },
    ]);

    return (
        <Column gap="24px">
            <Wrapper>
                <SourceDetails definition={definitionPersonalInformation} data={getValues()} />
            </Wrapper>
            <Wrapper>
                <SourceDetails definition={definitionAddressInformation} data={getValues()} />
            </Wrapper>
            <Wrapper>
                <SourceDetails definition={definitionDocumentInformation} data={getValues()} />
                <Row gap="16px">
                    {form.customer_documents.map((d) => {
                        if (isEmpty(d.document)) return <React.Fragment key={d.preview_label}></React.Fragment>;
                        return (
                            <Box display="flex" flexDirection="column" key={d.preview_label}>
                                <Typography variant="subtitle0">{d.preview_label}</Typography>
                                <img src={URL.createObjectURL(d.document)} />
                            </Box>
                        );
                    })}
                </Row>
            </Wrapper>
        </Column>
    );
}

CustomerFormStep4.propTypes = {
    isAddMode: PropTypes.bool,
};
