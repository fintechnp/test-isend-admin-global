import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "./store/action";
import { Delete } from "App/components";
import { CountryName } from "App/helpers";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterStreetType from "Private/components/StreetType/FilterStreetType";
import StreetTypeModal from "Private/components/StreetType/AddStreetTypeModal";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

const StreetType = ({ title }) => {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState({
        page_size: 15,
        page_number: 1,
    });

    const { loading: streetTypeLoading, response: allStreetType } = useSelector((state) => state.get_street_type);

    const { success: addStreetTypeSuccess, loading: addStreetTypeLoading } = useSelector(
        (state) => state.add_street_type,
    );
    const { success: updateStreetTypeSuccess, loading: updateStreetTypeLoading } = useSelector(
        (state) => state.update_street_type,
    );
    const { success: deleteStreetTypeSuccess, loading: deleteStreetTypeLoading } = useSelector(
        (state) => state.delete_street_type,
    );
    useEffect(() => {
        dispatch(actions.get_street_type("AUS", filterSchema));
        dispatch({ type: "DELETE_STREET_TYPE_RESET" });
        dispatch({ type: "ADD_STREET_TYPE_RESET" });
        dispatch({ type: "UPDATE_STREET_TYPE_RESET" });
    }, [filterSchema, dispatch, deleteStreetTypeSuccess, addStreetTypeSuccess, updateStreetTypeSuccess]);

    const sortByOptions =
        allStreetType?.data?.length > 0 &&
        Object.keys(allStreetType?.data[0])?.map((item) => {
            return { value: item, label: item };
        });

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
        dispatch(actions.delete_street_type(id));
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ row, getValue }) => {
                    return (
                        <Box>
                            <Typography component="p">{getValue() ? CountryName(getValue()) : "N/A"}</Typography>
                        </Box>
                    );
                },
            },
            {
                header: "Street Code",
                accessorKey: "street_code",
            },
            {
                header: "Street Name",
                accessorKey: "street_name",
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => {
                    return (
                        <TableRowActionContainer>
                            <StreetTypeModal update={true} update_data={row?.original} />
                            <Delete
                                id={row.original.street_type_id}
                                handleDelete={handleDelete}
                                loading={deleteStreetTypeLoading}
                                tooltext="Delete Street Type"
                            />
                        </TableRowActionContainer>
                    );
                },
            },
        ],
        [],
    );
    return (
        <PageContent
            documentTitle={title}
            title={
                <>
                    <Typography>{title}</Typography>
                </>
            }
            topRightEndContent={<StreetTypeModal update={false} />}
        >
            <FilterStreetType sortByOptions={sortByOptions} />

            <Grid container sx={{ pb: "24px", my: "15px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <TanstackReactTable
                        columns={columns}
                        title="Street Type"
                        data={allStreetType?.data || []}
                        loading={streetTypeLoading}
                        rowsPerPage={10}
                        totalPage={allStreetType?.pagination?.totalPage || 1}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={allStreetType?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </PageContent>
    );
};

export default StreetType;

export const PageLimitSelect = ({ onChange }) => {
    return (
        <select onChange={onChange} style={{ padding: "0.5rem", outline: "none" }}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
    );
};
