import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "./store/actions";
import { Delete } from "App/components";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import FilterLanguage from "../../../components/AddLanguage/FilterLanguage";
import LanguageValueModal from "../../../components/AddLanguage/AddLanguageValueModal";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));
const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const AddLanguage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState({
        page_size: 15,
        page_number: 1,
    });

    const { loading: getLanguageValueLoading, response: allLanguageValue } = useSelector(
        (state) => state.get_all_language_value,
    );

    const { success: addLanguageValueSuccess, loading: addLanguageValueLoading } = useSelector(
        (state) => state.add_language_value,
    );
    const { success: updateLanguageValueSuccess, loading: updateLanguageValueLoading } = useSelector(
        (state) => state.update_language_value,
    );
    const { success: deleteLanguageValueSuccess, loading: deleteLanguageValueLoading } = useSelector(
        (state) => state.delete_language_value,
    );
    useEffect(() => {
        dispatch(actions.get_all_language_value(filterSchema));
        dispatch({ type: "DELETE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "UPDATE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "ADD_LANGUAGE_VALUE_RESET" });
    }, [filterSchema, dispatch, addLanguageValueSuccess, updateLanguageValueSuccess, deleteLanguageValueSuccess]);

    const sortByOptions =
        allLanguageValue?.data?.length > 0 &&
        Object.keys(allLanguageValue?.data[0])?.map((item) => {
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
        dispatch(actions.delete_language_value(id));
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
                accessor: "f_serial_no",
                maxWidth: 80,
            },

            {
                header: "Language Key",
                accessor: "localization_key",
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
                header: "Language Value",
                accessor: "localization_value",
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
                header: "Translation Type",
                accessor: "translation_type",
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
                header: () => (
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
                        <Tooltip title="Language Details" arrow>
                            <IconButton
                                onClick={() => navigate(`/localization/details/${row?.original?.localization_id}`)}
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
                        </Tooltip>
                        <LanguageValueModal update={true} update_data={row?.original} />
                        <Delete
                            id={row?.original?.localization_id}
                            handleDelete={handleDelete}
                            loading={getLanguageValueLoading}
                            tooltext="Delete Language Value"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );
    return (
        <PageContent
            documentTitle="Add Language"
            title={
                <>
                    <Typography>Add Language</Typography>
                </>
            }
        >
            <FilterLanguage sortByOptions={sortByOptions} />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <LanguageValueModal update={false} />
            </div>
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <Table
                        columns={columns}
                        title="Language Value"
                        data={allLanguageValue?.data || []}
                        loading={getLanguageValueLoading}
                        rowsPerPage={8}
                        totalPage={allLanguageValue?.pagination?.totalPage || 1}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={allLanguageValue?.pagination}
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

export default AddLanguage;

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
