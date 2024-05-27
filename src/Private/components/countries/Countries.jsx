import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import dateUtils from "App/utils/dateUtils";
import Table, { TablePagination } from "App/components/Table";
import countryActions from "Private/features/countries/countryActions";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";

const initialState = {
    page_number: 1,
    page_size: 15,
};

const Countries = () => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const countriesList = JSON.parse(localStorage.getItem("country"));

    const { response, loading: isLoading } = useSelector((state) => state.get_countries);

    const { success: isAddSuccess } = useSelector((state) => state.add_country);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_country);

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

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <>
            <TanstackReactTable
                columns={columns}
                title="Country"
                data={countriesList ?? []}
                loading={isLoading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={countriesList?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </>
    );
};

export default Countries;
