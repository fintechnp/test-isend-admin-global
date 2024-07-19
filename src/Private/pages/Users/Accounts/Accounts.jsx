import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddAccount from "./components/AddAccount";
import Column from "App/components/Column/Column";
import AccountTable from "./components/AccountTable";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import apiEndpoints from "Private/config/apiEndpoints";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
    name: "",
    phone_number: "",
    email: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const schema = Yup.object().shape({
    email: Yup.string().email().nullable(),
});

function Accounts() {
    const dispatch = useDispatch();
    const { response: user_list, loading: loading } = useSelector((state) => state.get_all_user);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({
        initialState,
    });

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "phone_number",
            label: "Phone Number",
        },
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            name: "role",
            label: "Role",
            apiEndpoint: apiEndpoints.userProfileSetups.list,
            searchParamName: "name",
            valueKey: "id",
            labelKey: "role_name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "email",
            label: "Email",
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
            options: [
                {
                    label: "Active",
                    value: true,
                },
                {
                    label: "Inactive",
                    value: false,
                },
            ],
        },
    ];

    const sortData = [
        { key: "None", value: "" },
        { key: "Name", value: "name" },
        { key: "User Type", value: "user_type" },
        { key: "Created Date", value: "created_ts" },
        { key: "Email", value: "email" },
    ];

    useEffect(() => {
        dispatch(
            actions.get_user_number({
                include_count: true,
                page_number: 1,
                page_size: 20,
            }),
        );
    }, []);

    return (
        <PageContent
            documentTitle="User Accounts"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Users",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    schema={schema}
                    title="Search Users"
                    onReset={reset}
                />

                <PageContentContainer
                    title="Users"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <AddAccount update={false} />
                        </>
                    }
                >
                    <AccountTable
                        onPageChange={onPageChange}
                        filterSchema={filterSchema}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_USER] })(Accounts);
