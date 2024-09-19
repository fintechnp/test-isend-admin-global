import { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Column from "App/components/Column/Column";
import EditEmailElementModal from "./EditEmailElementModal";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import dateUtils from "App/utils/dateUtils";
import { templateForLabels } from "./data/template-for";
import emailTemplateActions from "./store/emailTemplateActions";
import PopoverButton from "App/components/Button/PopoverButton";

export default function ListEmailElement() {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_email_element);

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_element());
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "S.N",
                accessorKey: "f_serial_no",
            },
            {
                header: "Element Label",
                accessorKey: "element_label",
            },
            {
                header: "Element For",
                accessorKey: "element_for",
                cell: ({ getValue }) => <>{templateForLabels[getValue()]}</>,
            },
            {
                header: "Element Type",
                accessorKey: "element_type",
            },
            {
                header: "Created Status",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                        {row.original?.created_by ? <Typography>By: {row.original.created_by}</Typography> : "-"}
                    </Column>
                ),
            },
            {
                header: "Updated Status",
                accessorKey: "updated_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                        {row.original.updated_by ? <Typography>By: {row.original.updated_by}</Typography> : "-"}
                    </Column>
                ),
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <ListItemButton
                                onClick={() => {
                                    onClose();
                                    dispatch({
                                        type: "OPEN_UPDATE_EMAIL_ELEMENT_MODAL",
                                        payload: row.original,
                                    });
                                }}
                            >
                                Edit
                            </ListItemButton>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    return (
        <PageContent documentTitle="List Email Elements" breadcrumbs={[{ label: "Email Elements" }]}>
            <Column gap="16px">
                <PageContentContainer title="Email Elements">
                    <TanstackReactTable columns={columns} data={response?.data || []} loading={loading} />
                </PageContentContainer>
            </Column>
            <EditEmailElementModal />
        </PageContent>
    );
}
