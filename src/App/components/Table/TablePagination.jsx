import React from "react";
import MuiTablePagination from "@mui/material/TablePagination";

const ROWS_PER_PAGE_OPTIONS = [5, 15, 25, 50, 100];

const TablePagination = ({
    paginationData,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    return (
        <MuiTablePagination
            component="div"
            count={+paginationData?.totalCount || 10}
            page={+paginationData?.currentPage - 1 || 0}
            onPageChange={handleChangePage}
            rowsPerPage={+paginationData?.pageSize || 15}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};

export default TablePagination;
