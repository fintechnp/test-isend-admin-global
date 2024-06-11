import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { TablePagination } from "App/components/Table";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import DocumentAcceptanceFilterForm from "./DocumentAcceptanceFilterForm";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import documentAcceptanceActions from "Private/features/documentAcceptance/documentAcceptanceActions";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const DocumentAcceptance = () => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, isLoading } = useSelector((state) => state.get_document_acceptance_list);
    const { success: isAddSuccess } = useSelector((state) => state.add_document_acceptance);
    const { success: isUpdateSuccess } = useSelector((state) => state.update_document_acceptance);

    const documentAcceptanceList = (response?.data?.[0]?.document_list ?? []).map((d, index) => ({
        ...d,
        fSerialNumber: index + 1,
    }));

    useEffect(() => {
        if (filterSchema?.country) {
            dispatch(documentAcceptanceActions.get_document_acceptance_list(filterSchema));
        } else {
            dispatch({ type: "GET_DOCUMENT_ACCEPTANCE_LIST_RESET" });
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
                header: "Document Type",
                accessorKey: "document_type",
            },
            {
                header: "Document Type Name",
                accessorKey: "document_type_name",
            },
            {
                header: "Shufti Document Type",
                accessorKey: "shufti_document_type",
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
                                              dispatch({
                                                  type: "OPEN_UPDATE_DOCUMENT_ACCEPTANCE_MODAL",
                                                  payload: row.original,
                                              })
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

    return (
        <>
            <DocumentAcceptanceFilterForm
                setFilterSchema={setFilterSchema}
                loading={isLoading}
                handleReset={handleReset}
            />

            <TanstackReactTable
                title="Document Acceptance"
                data={documentAcceptanceList ?? []}
                noDataMessage="Select a country to view data"
                loading={isLoading}
                columns={columns}
                renderPagination={() => (
                    <TablePagination
                        paginationData={response?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </>
    );
    ss;
};

export default DocumentAcceptance;
