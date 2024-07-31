import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import PageContentContainer from "App/components/Container/PageContentContainer";
import AddDocumentAcceptanceModal from "./AddDocumentAcceptanceModal";
import DocumentAcceptanceFilterForm from "Private/pages/Setup/DocumentAcceptance/components/DocumentAcceptanceFilterForm";
import EditDocumentAcceptanceModal from "./EditDocumentAcceptanceModal";

import isEmpty from "App/helpers/isEmpty";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const ListDocumentAcceptance = () => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading: isLoading } = useSelector((state) => state.get_document_acceptance_list);

    const { success: isAddSuccess } = useSelector((state) => state.add_document_acceptance);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_document_acceptance);

    const documentAcceptanceList =
        (response?.data?.[0]?.document_list ?? []).map((data, index) => ({
            ...data,
            country: response.data[0].country,
            fSerialNumber: index + 1,
        })) ?? [];

    const fetch = () => dispatch(documentAcceptanceActions.get_document_acceptance_list(filterSchema));

    useEffect(() => {
        if (filterSchema?.country) {
            fetch();
        } else {
            dispatch(documentAcceptanceActions.get_document_acceptance_list_reset());
            setFilterSchema(initialState);
        }
    }, [dispatch, filterSchema, isAddSuccess, isUpdateSuccess]);

    const handleChangePage = (e, newPage) => {
        const updatedFilter = { ...filterSchema, page_number: ++newPage };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = { ...filterSchema, page_size: pageSize };
        setFilterSchema(updatedFilterSchema);
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "fSerialNumber",
            },
            {
                header: "Document For",
                accessorKey: "document_for",
            },
            {
                header: "Document Type Name",
                accessorKey: "document_type_name",
            },
            {
                header: "Sides",
                accessorKey: "has_two_side",
                cell: ({ getValue }) => <>{getValue() ? "Front, Back" : "Front"}</>,
            },
            {
                header: "Shufti Document Type",
                accessorKey: "shufti_document_type",
            },
            {
                header: "Status",
                accessorKey: "status",
            },
            {
                header: "Is Required ?",
                accessorKey: "is_required",
                cell: ({ getValue }) => <>{getValue() ? "Yes" : "No"}</>,
            },
            ...(can(permissions.EDIT_KYC_DOCUMENT_SETUP)
                ? [
                      {
                          header: "Actions",
                          cell: ({ row }) => {
                              return (
                                  <TableRowActionContainer>
                                      <IconButton
                                          onClick={() =>
                                              dispatch(documentAcceptanceActions.open_update_modal(row.original))
                                          }
                                      >
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
                              );
                          },
                      },
                  ]
                : []),
        ],
        [dispatch],
    );

    const handleReset = () => {
        setFilterSchema(initialState);
    };

    const selectedCountry = filterSchema?.country;

    const documentFor = filterSchema?.document_for;

    return (
        <PageContent
            documentTitle="KYC/KYB Documents"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "KYC KYB Documents",
                },
            ]}
        >
            <PageContentContainer
                title="KYC/KYB Documents"
                topRightContent={
                    <HasPermission permission={permissions.CREATE_KYC_DOCUMENT_SETUP}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => dispatch(documentAcceptanceActions.open_add_modal())}
                        >
                            Add Document
                        </Button>
                    </HasPermission>
                }
            >
                <DocumentAcceptanceFilterForm
                    setFilterSchema={setFilterSchema}
                    loading={isLoading}
                    handleReset={handleReset}
                />
                <TanstackReactTable
                    title="Document Acceptance"
                    data={documentAcceptanceList ?? []}
                    noDataMessage={isEmpty(selectedCountry) ? "Select a country to view data" : "No data available"}
                    loading={isLoading}
                    columns={columns}
                />
            </PageContentContainer>
            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <AddDocumentAcceptanceModal
                onAddSuccess={selectedCountry ? fetch : null}
                selectedCountryISO3={selectedCountry}
                documentFor={documentFor}
            />
            <EditDocumentAcceptanceModal onEditSuccess={selectedCountry ? fetch : null} />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_KYC_DOCUMENT_SETUP] })(ListDocumentAcceptance);
