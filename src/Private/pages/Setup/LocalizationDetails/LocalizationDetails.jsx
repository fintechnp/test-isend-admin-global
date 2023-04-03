import PageContent from "App/components/Container/PageContent";
import Spacer from "App/components/Spacer/Spacer";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./store/actions";
import Grid from "@mui/material/Grid";
import { Delete, Loading } from "App/components";
import NoResults from "Private/pages/Transactions/components/NoResults";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddTranslationData from "Private/components/Localization/LocalizationTranslation/AddLocaltionTranslation";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { TableSwitch } from "App/components/Table";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

const LocalizationDetails = ({ title }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { response: LocalizationDetails, loading: l_detail_loading } = useSelector(
        (state) => state.get_localization_details,
    );
    const { response: translationValues, loading: t_detail_loading } = useSelector(
        (state) => state.get_translation_value,
    );

    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_translation_value);

    const { success: a_success } = useSelector((state) => state.add_translation_value);

    const { success: u_success } = useSelector((state) => state.update_translation_value);

    useEffect(() => {
        dispatch(actions.get_localization_details(id));
        dispatch(actions.get_translation_value(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(actions.get_translation_value(id));
        dispatch({ type: "DELETE_TRANSLATION_VALUE_RESET" });
        dispatch({ type: "ADD_TRANSLATION_VALUE_RESET" });
        dispatch({ type: "UPDATE_TRANSLATION_VALUE_RESET" });
    }, [d_success, a_success, u_success]);

    const handleDelete = (id) => {
        dispatch(actions.delete_translation_value(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        console.log("Status");
        dispatch(actions.update_translation_value_status(id, { is_active: is_active }));
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Translated Text",
                accessorKey: "translated_text",
            },
            {
                header: "Language",
                accessorKey: "language_name",
            },
            {
                header: "Language Code",
                accessorKey: "language_code",
            },
            {
                header: "Country",
                accessorKey: "language_id",
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: (data) => {
                    return (
                        <TableSwitch
                            value={data.row.original?.is_active ?? false}
                            data={data.row.original}
                            handleStatus={handleStatus}
                            dataId={data.row.original?.translated_id}
                        />
                    );
                },
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <AddTranslationData
                            id={row?.original?.translated_id}
                            update={true}
                            updatedData={row?.original}
                        />
                        <Delete
                            id={row.original.translated_id}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete Translation Value"
                        />
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    return (
        <PageContent title={title} topRightEndContent={<AddTranslationData id={Number(id)} />}>
            {l_detail_loading && (
                <Grid item xs={12}>
                    <Loading loading={l_detail_loading} />
                </Grid>
            )}
            {!l_detail_loading && LocalizationDetails?.data && LocalizationDetails?.data?.length === 0 && (
                <Grid item xs={12}>
                    <NoResults text="No Localization Found For This Id" />
                </Grid>
            )}
            {!l_detail_loading && LocalizationDetails?.data?.length !== 0 && (
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="p" color="primary.main">
                            Localization Key
                        </Typography>
                        <Typography>{LocalizationDetails?.data?.localization_key}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" color="primary.main">
                            Localization Value
                        </Typography>
                        <Typography>{LocalizationDetails?.data?.localization_value}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="p" color="primary.main">
                            Translation Type
                        </Typography>
                        <Typography>{LocalizationDetails?.data?.translation_type}</Typography>
                    </Grid>
                </Grid>
            )}
            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="Translation Values"
                data={translationValues?.data || []}
                // sub_columns={sub_columns}
                loading={t_detail_loading}
            />
        </PageContent>
    );
};
export default LocalizationDetails;
