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

const initialState = {
  page_number: 1,
  page_size: 15,
};

const CountryStates = () => {
  const dispatch = useDispatch();

  const [filterSchema, setFilterSchema] = useState(initialState);

  const [country, setCountry] = useState();

  const { response: data, loading: isLoading } = useSelector(
    (state) => state.get_country_state_list
  );

  const { loading: isDeleting, success: isDeleteSuccess } = useSelector(
    (state) => state.delete_country_state
  );

  const { success: isAddSuccess } = useSelector(
    (state) => state.add_country_state
  );

  const { success: isUpdateSuccess } = useSelector(
    (state) => state.update_country_state
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "state_id",
        maxWidth: 80,
      },
      {
        Header: "Country",
        accessor: "country",
        Cell: (data) => (
          <Typography component="p">
            {data.value ? CountryName(data.value) : "n/a"}
          </Typography>
        ),
      },
      {
        Header: "State Name",
        accessor: "name",
        Cell: (data) => (
          <Typography component="p">
            {data.value ? data.value : "n/a"}
          </Typography>
        ),
      },
      {
        Header: "State Code",
        accessor: "code",
        Cell: (data) => (
          <Typography component="p">
            {data.value ? data.value : "n/a"}
          </Typography>
        ),
      },
      {
        Header: () => (
          <Box textAlign="center">
            <Typography>Actions</Typography>
          </Box>
        ),
        accessor: "show",
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Edit Banner" arrow>
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
            <Delete
              id={row.original.state_id}
              handleDelete={handleDelete}
              loading={isDeleting}
              tooltext="Delete Banner"
            />
          </Box>
        ),
      },
    ],
    []
  );

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
  }, [
    dispatch,
    filterSchema,
    isAddSuccess,
    isDeleteSuccess,
    isUpdateSuccess,
    country,
  ]);

  return (
    <>
      <Spacer />
      <CountryStateFilter onCountryChange={handleCountryChange} />
      <Table
        columns={columns}
        title="Country States"
        data={data?.data || []}
        loading={isLoading}
        rowsPerPage={8}
        totalPage={data?.pagination?.totalPage || 1}
        renderPagination={() => (
          <TablePagination
            paginationData={data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
        noDataMessage={!country ? "Select a country" : "No data avaliable"}
      />
    </>
  );
};

export default CountryStates;
