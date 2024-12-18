import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import HasPermission from "../shared/HasPermission";
import Table, { TablePagination } from "App/components/Table";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import dateUtils from "App/utils/dateUtils";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";
import countryActions from "Private/features/countries/countryActions";

const initialState = {
    page_number: 1,
    page_size: 15,
};

const Countries = () => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const countriesList = JSON.parse(localStorage.getItem("country"));

    const { response, loading: isLoading } = useSelector((state) => state.get_countries);

    const { success: isAddSuccess } = useSelector((state) => state.add_country);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_country);

    const { filterSchema, onPageChange, onRowsPerPageChange } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(countryActions?.get_countries());
    }, [dispatch, isAddSuccess, isUpdateSuccess]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Country Id",
                accessorKey: "country_id",
            },
            {
                header: "Country",
                accessorKey: "country",
            },
            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Iso2",
                accessorKey: "iso2",
            },
            {
                header: "Iso3",
                accessorKey: "iso3",
            },
            {
                header: "Phone Code",
                accessorKey: "phone_code",
            },

            {
                header: "Phone Regex",
                accessorKey: "phone_regex",
            },
            {
                header: "Postal Code Regex",
                accessorKey: "postcode_regex",
            },
            {
                header: "Has State",
                accessorKey: "has_state",
            },
            {
                header: "Created At",
                accessorKey: "created_ts",
                cell: ({ row }) => {
                    return <Typography>{dateUtils.getFormattedDate(row.original.created_ts)}</Typography>;
                },
            },
            {
                header: "Updated At",
                cell: ({ row }) => {
                    return <Typography>{dateUtils.getFormattedDate(row.original.updated_ts)}</Typography>;
                },
            },
            ...(can(permissions.EDIT_COUNTRY_SETUP)
                ? [
                      {
                          header: "Actions",
                          accessorKey: "show",
                          cell: ({ row }) => (
                              <TableRowActionContainer>
                                  <IconButton
                                      onClick={() =>
                                          dispatch({
                                              type: "OPEN_UPDATE_COUNTRY_MODAL",
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
                          ),
                      },
                  ]
                : []),
        ],
        [],
    );

    return (
        <Column gap="16px">
            <PageContentContainer
                title="Countries"
                topRightContent={
                    <HasPermission permission={permissions.CREATE_COUNTRY_SETUP}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                dispatch({
                                    type: "OPEN_ADD_COUNTRY_MODAL",
                                })
                            }
                        >
                            Add Country
                        </Button>
                    </HasPermission>
                }
            >
                <TanstackReactTable columns={columns} title="Country" data={countriesList ?? []} loading={isLoading} />
            </PageContentContainer>
            <TablePagination
                paginationData={countriesList?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </Column>
    );
};

export default Countries;
