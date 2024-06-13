import { useState } from "react";

const useListFilterStore = ({ initialState }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filterSchema, setFilterSchema] = useState(initialState);

    const openFilter = () => setIsFilterOpen(true);

    const closeFilter = () => setIsFilterOpen(false);

    /**
     * handle quick filter
     *
     * @param {string} name
     * @param {string} value
     * @returns {void}
     *
     */
    const onQuickFilter = (name, value) => {
        const updatedFilterSchema = {
            ...filterSchema,
            [name]: value,
        };
        setFilterSchema(updatedFilterSchema);
    };

    /***
     * delete filter params
     *
     * @param {string|array} filterKeys
     * @returns {void}
     *
     */
    const onDeleteFilterParams = (...filterKeys) => {
        const schema = { ...filterSchema };
        filterKeys.forEach((key) => delete schema[key]);
        setFilterSchema(schema);
    };

    /**
     * on filter form submit
     *
     * @param {object} data
     * @returns {void}
     */
    const onFilterSubmit = (data) =>
        setFilterSchema({
            ...filterSchema,
            ...data,
        });

    /**
     * reset filter schema
     *
     * @param {object} filterSchema
     */
    const reset = () => {
        setFilterSchema(initialState);
        setIsFilterOpen(false);
    };

    /**
     * handle page change
     *
     * @param {Event} e
     * @param {number} newPage
     *  @returns {void}
     */
    const onPageChange = (e, newPage) => {
        setFilterSchema({
            ...filterSchema,
            page_number: ++newPage,
        });
    };

    /**
     * handle page change
     *
     * @param {Event} e
     *  @returns {void}
     */
    const onRowsPerPageChange = (e) => {
        const pageSize = e.target.value;
        setFilterSchema({
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        });
    };

    return {
        isFilterOpen,
        openFilter,
        closeFilter,
        onQuickFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        reset,
        filterSchema,
    };
};

export default useListFilterStore;
