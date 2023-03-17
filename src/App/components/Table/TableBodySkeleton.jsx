import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";

import range from "App/helpers/range";

function TableBodySkeleton({ rowCount, columnCount, skipColumns }) {
    let rows = range(1, rowCount);
    let columns = range(1, columnCount);

    return (
        <>
            {rows.map((row) => (
                <TableRow key={row}>
                    {columns.map((column, key) => (
                        <TableCell key={column}>
                            {!skipColumns.includes(key + 1) && (
                                <Box sx={{ height: "28px", display: "flex", alignItems: "center" }}>
                                    <Skeleton animation="pulse" variant="rectangular" width={"100%"} height="25" />
                                </Box>
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}

export default TableBodySkeleton;

TableBodySkeleton.propTypes = {
    rowCount: PropTypes.number,
    columnCount: PropTypes.number.isRequired,
    skipColumns: PropTypes.arrayOf(PropTypes.number),
};

TableBodySkeleton.defaultProps = {
    rowCount: 8,
    skipColumns: [],
};
