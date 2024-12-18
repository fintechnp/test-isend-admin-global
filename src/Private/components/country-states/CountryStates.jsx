import React, { useState, useEffect, useMemo } from "react";
import { change } from "redux-form";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Delete } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import CountryStateFilter from "./CountryStateFilter";
import Table, { TablePagination } from "App/components/Table";

import { CountryName } from "App/helpers";
import countryStateActions from "Private/features/country-states/countryStateActions";
import { permissions } from "Private/data/permissions";
import HasPermission from "../shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const initialState = {
    page_number: 1,
    page_size: 15,
};

const CountryStates = () => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const [country, setCountry] = useState();

    const { response: data, loading: isLoading } = useSelector((state) => state.get_country_state_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_country_state);

    const { success: isAddSuccess } = useSelector((state) => state.add_country_state);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_country_state);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ row }) => (
                    <Typography component="p">
                        {row?.original?.country ? CountryName(row?.original?.country) : "n/a"}
                    </Typography>
                ),
            },
            {
                header: "State Name",
                accessorKey: "name",
                cell: ({ row }) => (
                    <Typography component="p">{row?.original?.name ? row?.original?.name : "n/a"}</Typography>
                ),
            },
            {
                header: "State Code",
                accessorKey: "code",
                cell: ({ row }) => (
                    <Typography component="p">{row?.original?.code ? row?.original?.code : "n/a"}</Typography>
                ),
            },
            ...(can([permissions.EDIT_COUNTRY_STATE, permissions.DELETE_COUNTRY_STATE])
                ? [
                      {
                          header: () => (
                              <Box textAlign="center">
                                  <Typography>Actions</Typography>
                              </Box>
                          ),
                          accessorKey: "show",
                          cell: ({ row }) => (
                              <Box
                                  sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                  }}
                              >
                                  <HasPermission permission={permissions.EDIT_COUNTRY_STATE}>
                                      <Tooltip title="Edit State" arrow>
                                          <IconButton
                                              onClick={() =>
                                                  dispatch({
                                                      type: "OPEN_UPDATE_COUNTRY_STATE_MODAL",
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
                                      </Tooltip>
                                  </HasPermission>
                                  <HasPermission permission={permissions.DELETE_COUNTRY_STATE}>
                                      <Delete
                                          id={row.original.state_id}
                                          handleDelete={handleDelete}
                                          loading={isDeleting}
                                          tooltext="Delete State"
                                      />
                                  </HasPermission>
                              </Box>
                          ),
                      },
                  ]
                : []),
        ],
        [],
    );

    const countries = JSON.parse(localStorage.getItem("country"))?.map((c) => ({ label: c.country, value: c.iso3 }));

    const handleCountryChange = (e) => {
        setCountry(e.target.value ?? undefined);
        dispatch(change("add_country_state_form", "country", e.target.value ?? ""));
    };

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

    const handleDelete = (id) => {
        dispatch(countryStateActions.delete_country_state(id));
    };

    useEffect(() => {
        if (!country) return;
        dispatch(countryStateActions.get_country_states(country, filterSchema));
        dispatch({ type: "DELETE_COUNTRY_STATE_RESET" });
    }, [dispatch, filterSchema, isAddSuccess, isDeleteSuccess, isUpdateSuccess, country]);

    return (
        <>
            <CountryStateFilter onCountryChange={handleCountryChange} countries={countries} />
            <TanstackReactTable
                columns={columns}
                title="Country States"
                data={data?.data || []}
                loading={isLoading}
                totalPage={data?.pagination?.totalPage || 1}
                noDataMessage={!country ? "Select a country" : "No data avaliable"}
            />
            <TablePagination
                paginationData={data?.pagination}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
};

export default CountryStates;
