import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Column from "App/components/Column/Column";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { helpCenterActions } from "./store";
import AddHelpCenterModal from "./components/AddHelpCenterModal";
import EditHelpCenterModal from "./components/EditHelpCenterModal";

export default function ListHelpCenter() {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.list_help_center);

    const data = response?.data ?? [];

    const fetch = () => dispatch(helpCenterActions.get_help_centers());

    useEffect(() => {
        fetch();
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
        },

        {
            header: "Phone Number",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Actions",
            accessorKey: "show",
            cell: ({ row }) => (
                <TableRowActionContainer>
                    <IconButton onClick={() => dispatch(helpCenterActions.open_edit_modal(row.original))}>
                        <EditOutlinedIcon
                            sx={{
                                fontSize: "20px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                        />
                    </IconButton>
                </TableRowActionContainer>
            ),
        },
    ]);

    return (
        <PageContent
            documentTitle="Help Center"
            breadcrumbs={[
                {
                    label: "List Help Center",
                },
                {
                    label: "Return",
                },
            ]}
        >
            <Column gap="16px">
                <PageContentContainer
                    title="Help Center"
                    topRightContent={
                        <Button onClick={() => dispatch(helpCenterActions.open_add_modal())} variant="contained">
                            Add Help Center
                        </Button>
                    }
                >
                    <TanstackReactTable columns={columns} data={data} loading={loading} />
                    <AddHelpCenterModal onAddSuccess={fetch} />
                    <EditHelpCenterModal onUpdateSuccess={fetch} />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}
