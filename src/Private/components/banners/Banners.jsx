import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import BannerForm from "./BannerForm";
import { Delete } from "App/components";
import BannerFilter from "./BannerFilter";
// import AddDeliveryOption from "./components/AddDeliveryOption";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import Table, { TablePagination, TableSwitch } from "App/components/Table";

import bannerActions from "Private/features/banners/bannerActions";

const MenuContainer = styled("div")(({ theme }) => ({
  margin: "8px 0px",
  borderRadius: "6px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.border.light}`,
  background: theme.palette.background.dark,
}));

const SwitchWrapper = styled(Box)(({ theme }) => ({
  "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
    opacity: 0.8,
    color: theme.palette.primary.main,
  },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  opacity: 0.7,
  padding: "3px",
  color: "border.main",
  "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
  fontSize: "14px",
  color: theme.palette.secondary.contrastText,
  textTransform: "capitalize",
}));

const initialState = {
  page_number: 1,
  page_size: 15,
};

const Banners = (props) => {
  const dispatch = useDispatch();
  const [filterSchema, setFilterSchema] = useState(initialState);

  const { response: data, loading: isLoading } = useSelector(
    (state) => state.get_banner_list
  );
  const { loading: d_loading, success: isDeleting } = useSelector(
    (state) => state.delete_banner
  );
  const { success: isAddSuccess } = useSelector((state) => state.add_banner);
  const { success: isDeleteSuccess } = useSelector((state) => state.update_banner);

  useEffect(() => {
    dispatch(bannerActions.get_banners(filterSchema));
    dispatch({ type: "DELETE_BANNER_RESET" });
  }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "banner_id",
        maxWidth: 80,
      },
      {
        Header: "Option Name",
        accessor: "delivery_name",
        Cell: (data) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
              {data.value ? data.value : "n/a"}
            </StyledName>
          </Box>
        ),
      },
      {
        Header: () => (
          <Box>
            <Typography>Payout Agent</Typography>
          </Box>
        ),
        accessor: "payout_agent",
        Cell: (data) => (
          <Box>
            <StyledText component="p">
              {data.value ? data.value : "n/a"}
            </StyledText>
          </Box>
        ),
      },
      {
        Header: () => (
          <Box>
            <Typography>Payment Type</Typography>
          </Box>
        ),
        accessor: "payment_type",
        Cell: (data) => (
          <Box>
            <StyledText component="p">
              {data.value ? ReferenceName(1, data.value) : "n/a"}
            </StyledText>
          </Box>
        ),
      },
      {
        Header: () => (
          <Box>
            <Typography>Country/Currency</Typography>
          </Box>
        ),
        accessor: "country_code",
        Cell: (data) => (
          <Box>
            <StyledText component="p">
              {data.value ? CountryName(data.value) : "N/A"}
            </StyledText>
            <Typography
              sx={{
                opacity: 0.6,
                fontSize: "12px",
                lineHeight: 1,
              }}
            >
              {data?.row?.original?.currency_code
                ? CurrencyName(data?.row?.original?.currency_code)
                : "N/A"}
            </Typography>
          </Box>
        ),
      },
      {
        Header: () => (
          <Box textAlign="right" sx={{}}>
            <Typography>Status</Typography>
          </Box>
        ),
        accessor: "is_active",
        width: 120,
        Cell: (data) => (
          <SwitchWrapper textAlign="right" sx={{}}>
            <TableSwitch
              value={data?.value}
              data={data.row.original}
              handleStatus={handleStatus}
            />
          </SwitchWrapper>
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
              justifyContent: "center",
            }}
          >
            <span {...row.getToggleRowExpandedProps({})}>
              {row.isExpanded ? (
                <Tooltip title="Hide Delivery Option Details" arrow>
                  <IconButton>
                    <VisibilityOffOutlinedIcon
                      sx={{
                        fontSize: "20px",
                        "&:hover": {
                          background: "transparent",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Show Delivery Option Details" arrow>
                  <IconButton>
                    <RemoveRedEyeOutlinedIcon
                      sx={{
                        fontSize: "20px",
                        "&:hover": {
                          background: "transparent",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </span>
            <BannerForm update={true} update_data={row?.original} />
            <Delete
              id={row.original.tid}
              handleDelete={handleDelete}
              loading={d_loading}
              tooltext="Delete Delivery Option"
            />
          </Box>
        ),
      },
    ],
    []
  );

  const sub_columns = [
    { key: "banner_id", name: "Id", type: "default" },
    { key: "delivery_name", name: "Name", type: "default" },
    { key: "payout_agent", name: "Payout Agent", type: "default" },
    { key: "country_code", name: "Country", type: "country" },
    { key: "currency_code", name: "Currency", type: "currency" },
    {
      key: "payment_type",
      name: "Payment Type",
      type: "reference",
      ref_value: 1,
    },
    { key: "is_active", name: "Status", type: "boolean" },
    { key: "created_ts", name: "Created Date", type: "date" },
  ];

  const handleSearch = useCallback(
    (e) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = {
        ...filterSchema,
        search: searchValue,
      };
      setFilterSchema(updatedFilterSchema);
    },
    [filterSchema]
  );

  const handleCountry = (e) => {
    const country = e.target.value;
    const updatedFilterSchema = {
      ...filterSchema,
      payout_country: country,
    };
    setFilterSchema(updatedFilterSchema);
  };

  const handleOrder = (e) => {
    const order = e.target.value;
    const updatedFilterSchema = {
      ...filterSchema,
      order_by: order,
    };
    setFilterSchema(updatedFilterSchema);
  };

  const handlePayemntType = (e) => {
    const payment = e.target.value;
    const updatedFilterSchema = {
      ...filterSchema,
      payment_type: payment,
    };
    setFilterSchema(updatedFilterSchema);
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
    dispatch(bannerActions.delete_banner(id));
  };

  const handleStatus = useCallback((is_active, id) => {
    dispatch(bannerActions.update_banner_status(id, { is_active: is_active }));
  }, []);

  return (
    <>
      <Table
        columns={columns}
        title="Delivery Option Details"
        data={data?.data || []}
        sub_columns={sub_columns}
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
      />
    </>
  );
};

export default Banners;
