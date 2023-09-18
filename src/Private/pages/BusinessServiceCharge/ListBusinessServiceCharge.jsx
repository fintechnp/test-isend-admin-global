import React, { useEffect, useMemo, useState } from "react";

import PageContent from "App/components/Container/PageContent";
import { useDispatch, useSelector } from "react-redux";

import { businessChargeActions as actions } from "./store";
import { Grid, IconButton, Switch } from "@mui/material";
import { Loading } from "App/components";
import FilterForm from "Private/components/BusinessCharge/BusinessChargeFilterForm";
import NoResults from "../Transactions/components/NoResults";
import Spacer from "App/components/Spacer/Spacer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { TablePagination } from "App/components/Table";
import Button from "App/components/Button/Button";
import { useNavigate } from "react-router";
import routePaths from "Private/config/routePaths";
import Modal from "App/components/Modal/Modal";
import BusinessChargeModal from "Private/components/BusinessCharge/BusinessChargeModal";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListBusinessServiceCharge() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCharge, setSelectedCharge] = useState(null);

    const { response, loading } = useSelector((state) => state.get_all_business_charge);
    console.log("🚀 ~ file: ListBusinessServiceCharge.jsx:17 ~ ListBusinessServiceCharge ~ response:", response);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Sending Country",
                accessorKey: "sendingCountry",
            },
            {
                header: "Business",
                accessorKey: "business",
            },
            {
                header: "Receiving Country",
                accessorKey: "receivingCountry",
            },

            {
                header: "Status",
                accessorKey: "isActive",
                cell: ({ getValue, row }) => {
                    return (
                        <Switch
                            defaultChecked={getValue() === 1 ? true : false}
                            // onChange={(e) => {
                            //     dispatch(marketMakerAcions.update_market_maker_status(row?.original?.marketMakerId));
                            // }}
                        />
                    );
                },
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                setSelectedCharge(row?.original);
                                setOpenModal(true);
                            }}
                        >
                            <RemoveRedEyeOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </IconButton>
                        <IconButton>
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
        ],
        [],
    );

    useEffect(() => {
        dispatch(actions.get_all_business_charge(filterSchema));
    }, [filterSchema]);

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <>
            <PageContent
                title="Business Service Charge List"
                topRightEndContent={
                    <Button
                        onClick={() => {
                            navigate(routePaths.agent.addBusinessServiceCharge);
                        }}
                    >
                        Add Service Charge
                    </Button>
                }
            >
                {loading && (
                    <Grid item xs={12}>
                        <Loading loading={loading} />
                    </Grid>
                )}

                <FilterForm setFilterSchema={setFilterSchema} loading={loading} />

                {!loading && response?.data && response?.data?.length === 0 ? (
                    <Grid item xs={12}>
                        <NoResults text="No Business Service Charge Found" />
                    </Grid>
                ) : (
                    <>
                        <Spacer />
                        <TanstackReactTable
                            columns={columns}
                            title="Business Charge"
                            data={response?.data ?? []}
                            loading={loading}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={response?.pagination}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            )}
                        />
                    </>
                )}
            </PageContent>
            <Modal
                title="Business Service Charge Detail"
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
                sx={{
                    width: "60%",
                }}
            >
                <BusinessChargeModal data={selectedCharge} />
            </Modal>
        </>
    );
}
