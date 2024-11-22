import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Image from "./components/Image";
import buildRoute from "App/helpers/buildRoute";
import LargeImage from "./components/LargeImage";
import Column from "App/components/Column/Column";
import routePaths from "Private/config/routePaths";
import { Delete } from "./../../../../App/components";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import { TablePagination } from "./../../../../App/components/Table";
import { FormatDate, ReferenceName } from "./../../../../App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import AddDocuments from "./AddDocuments";
import { KycDocumentStatus, KycDocumentStatusOptions } from "./data/KycDocumentStatus";

const initialState = {
    page_number: 1,
    page_size: 10,
    search: "",
    sort_by: "",
    order_by: "DESC",
    status: KycDocumentStatus.ACTIVE,
};

const sortByData = [
    { key: "None", value: "" },
    { key: "Type", value: "type" },
    { key: "Name", value: "name" },
    { key: "Created By", value: "created_by" },
];

function Documents(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const statusOptions = KycDocumentStatusOptions;

    const { response: Documents, loading } = useSelector((state) => state.get_documents);

    const { success } = useSelector((state) => state.upload_documents);
    const { success: del_success, loading: d_loading } = useSelector((state) => state.delete_documents);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        reset,
        filterSchema,
        onFilterSubmit,
        onQuickFilter,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        if (id) {
            dispatch(actions.get_documents(id, filterSchema));
            dispatch({ type: "DELETE_DOCUMENTS_RESET" });
            dispatch({ type: "UPLOAD_DOCUMENTS_RESET" });
            dispatch({ type: "GET_DOCUMENTS_BYID_RESET" });
        }
    }, [dispatch, id, success, del_success, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Image",
                accessorKey: "document",

                cell: ({ getValue, row }) => {
                    return (
                        <>
                            {getValue() ? (
                                getValue().toLowerCase().includes(".pdf") ? (
                                    "PDF Document"
                                ) : (
                                    <Image document={getValue()} />
                                )
                            ) : (
                                <Image document="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" />
                            )}
                        </>
                    );
                },
            },
            {
                header: "Type",
                accessorKey: "type",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? ReferenceName(2, getValue()) : ""}</Typography>
                        <Typography>{row.original?.side ? ReferenceName(48, row.original?.side) : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: ({ getValue }) => <>{getValue() ? getValue() : ""}</>,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                header: "Created At/By",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? FormatDate(getValue()) : "-"}</Typography>
                        <Typography>{row.original?.created_by ? `By: ${row.original?.created_by}` : "-"}</Typography>
                    </Column>
                ),
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                {row.original?.document.toLowerCase().includes(".pdf") ? (
                                    <ListItemButton onClick={() => window.open(row.original?.document, "_blank")}>
                                        View Document
                                    </ListItemButton>
                                ) : (
                                    <LargeImage
                                        side={row.original.side}
                                        title={row.original.type}
                                        image={row.original?.document}
                                        enablePopoverAction
                                    />
                                )}
                                <Delete
                                    fontSize="25px"
                                    loading={d_loading}
                                    id={row.original.tid}
                                    handleDelete={() => handleDelete(row.original.document_id)}
                                    tooltext="Delete Documents"
                                    enablePopoverAction
                                    button
                                />
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const handleDelete = (doc_id) => {
        dispatch(actions.delete_documents(id, doc_id));
    };

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
            options: statusOptions,
        },
    ];
    return (
        <PageContent
            documentTitle="Customer's Documents"
            breadcrumbs={[
                {
                    label: "Customers",
                },
                {
                    label: `${id}`,
                    link: buildRoute(routePaths.ViewCustomer, id),
                },
                {
                    label: "Documents",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    onReset={reset}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onDelete={onDeleteFilterParams}
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                />
                <PageContentContainer
                    title="Customer's Documents"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                sortByData={sortByData}
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                values={filterSchema}
                            />
                            <AddDocuments />
                        </>
                    }
                >
                    <TanstackReactTable data={Documents?.data || []} columns={columns} />
                </PageContentContainer>
                <TablePagination
                    paginationData={Documents?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default Documents;
