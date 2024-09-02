import { useState } from "react";

/**
 * @typedef {Object} FilterStore
 * @property {boolean} isFilterOpen - Whether the filter modal is open.
 * @property {function} openFilter - Function to open the filter modal.
 * @property {function} closeFilter - Function to close the filter modal.
 * @property {function} onQuickFilter - Function to handle quick filter changes.
 * @property {function} onDeleteFilterParams - Function to delete filter parameters.
 * @property {function} onFilterSubmit - Function to submit the filter form.
 * @property {function} onPageChange - Function to handle page changes.
 * @property {function} onRowsPerPageChange - Function to handle rows per page changes.
 * @property {function} reset - Function to reset the filter schema.
 * @property {Object} filterSchema - The current filter schema.
 */

/**
 * @typedef {Object} FilterStoreProps
 * @property {object} initialState - initialState
 * @property {string} [pageNumberKeyName=page_number] - page number query params key name.
 * @property {string} [pageSizeKeyName=page_size] - page size query params key name.
 */

/**
 * Custom hook for managing list filter state and actions.
 *
 * @param {FilterStoreProps} props - The initial state of the filter schema.
 * @returns {FilterStore} The filter store with state and actions.
 */
const useListFilterStore = ({ initialState, pageNumberKeyName = "page_number", pageSizeKeyName = "page_size" }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    /**
     * Opens the filter modal.
     *
     * @returns {void}
     */
    const openFilter = () => setIsFilterOpen(true);

    /**
     * Closes the filter modal.
     *
     * @returns {void}
     */
    const closeFilter = () => setIsFilterOpen(false);

    /**
     * Handles quick filter changes.
     *
     * @param {string} name - The name of the filter field.
     * @param {string} value - The value of the filter field.
     * @returns {void}
     */
    const onQuickFilter = (name, value) => {
        const updatedFilterSchema = {
            ...filterSchema,
            [name]: value,
        };
        setFilterSchema(updatedFilterSchema);
    };

    /**
     * Deletes filter parameters.
     *
     * @param {...(string|string[])} filterKeys - The keys of the filters to be deleted.
     * @returns {void}
     */
    const onDeleteFilterParams = (...filterKeys) => {
        const schema = { ...filterSchema };
        filterKeys.forEach((key) => delete schema[key]);
        setFilterSchema(schema);
    };

    /**
     * Submits the filter form.
     *
     * @param {Object} data - The data from the filter form.
     * @returns {void}
     */
    const onFilterSubmit = (data) =>
        setFilterSchema({
            ...filterSchema,
            ...data,
            [pageNumberKeyName]: 1,
        });

    /**
     * Resets the filter schema to the initial state.
     *
     * @returns {void}
     */
    const reset = () => {
        setFilterSchema(initialState);
        setIsFilterOpen(false);
    };

    /**
     * Handles page changes.
     *
     * @param {Event} e - The event object.
     * @param {number} newPage - The new page number.
     * @returns {void}
     */
    const onPageChange = (e, newPage) => {
        setFilterSchema({
            ...filterSchema,
            [pageNumberKeyName]: ++newPage,
        });
    };

    /**
     * Handles rows per page changes.
     *
     * @param {Event} e - The event object.
     * @returns {void}
     */
    const onRowsPerPageChange = (e) => {
        const pageSize = e.target.value;
        setFilterSchema({
            ...filterSchema,
            [pageNumberKeyName]: 1,
            [pageSizeKeyName]: +pageSize,
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
