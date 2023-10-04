import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { businessChargeActions as actions } from "./store";
import React, { useEffect, useMemo, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Modal from "App/components/Modal/Modal";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import { TablePagination } from "App/components/Table";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import FilterForm from "Private/components/BusinessCharge/BusinessChargeFilterForm";
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

    const { success: updateStatusSuccess } = useSelector((state) => state.update_business_charge_status);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Type",
                accessorKey: "relatedTo",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Sending Country",
                accessorKey: "sendingCountry",
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
                            onChange={(e) => {
                                dispatch(actions.update_business_charge_status(row?.original?.serviceChargeId));
                            }}
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
                        <IconButton
                            onClick={() => {
                                navigate(
                                    buildRoute(
                                        routePaths.agent.updateBusinessServiceCharge,
                                        row?.original?.serviceChargeId,
                                    ),
                                );
                            }}
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
        ],
        [],
    );

    useEffect(() => {
        dispatch(actions.get_all_business_charge(filterSchema));
    }, [filterSchema]);

    useEffect(() => {
        if (updateStatusSuccess) {
            dispatch(actions.get_all_business_charge(filterSchema));
        }
    }, [updateStatusSuccess]);

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
