import React from "react";
import Box from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import usePagination from "@mui/material/usePagination";

import Row from "../Row/Row";

import { buttonBorderRadius, fonts } from "App/theme/theme";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25, 50, 100];

const List = styled("ul")(({ theme }) => ({
    listStyle: "none",
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.stroke.base}`,
    borderRadius: buttonBorderRadius.outer,
    padding: 0,
    display: "flex",
    "& li": {
        margin: 0,
        padding: 0,
        "&:not(:last-of-type)": {
            borderRight: `1px solid ${theme.palette.stroke.base}`,
        },
        "& button": {
            margin: 0,
            padding: 0,
            background: "none",
            border: 0,
            height: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            gap: "6px",
            color: theme.palette.text.baseSecond,
            fontFamily: fonts.primary,
            fontWeight: 500,
            "&[aria-current='true']": {
                color: theme.palette.primary.main,
            },
        },
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    background: theme.palette.common.white,
    borderRadius: buttonBorderRadius.outer,
    color: theme.palette.text.baseSecond,
    border: 0,
    "& fieldset.MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.stroke.base,
    },
}));

const TablePagination = ({ paginationData, handleChangePage, handleChangeRowsPerPage }) => {
    const { items } = usePagination({
        page: +paginationData?.currentPage || 1,
        count: +paginationData?.totalPage || 0,
        onChange: (e, newPage) => handleChangePage?.(e, newPage - 1),
    });

    return (
        <Row justifyContent="space-between" alignItems="center" gap="16px">
            <Typography fontWeight={500}>Total Records: {paginationData?.totalCount || 0}</Typography>
            <Row flex={1} justifyContent="flex-end">
                <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                    <Typography>Rows per page : </Typography>
                    <Select size="small" onChange={handleChangeRowsPerPage} value={+paginationData?.pageSize || 10}>
                        {ROWS_PER_PAGE_OPTIONS.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Row>
            <List>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                        children = <button type="button">...</button>;
                    } else if (type === "page") {
                        children = (
                            <button
                                type="button"
                                style={{
                                    fontWeight: selected ? "bold" : undefined,
                                }}
                                {...item}
                            >
                                {page}
                            </button>
                        );
                    } else {
                        children = (
                            <button type="button" {...item}>
                                {(() => {
                                    if (type === "previous") {
                                        return (
                                            <>
                                                <ArrowLeftIcon />
                                                <Typography>Prev</Typography>
                                            </>
                                        );
                                    } else if (type === "next") {
                                        return (
                                            <>
                                                <Typography>Next</Typography> <ArrowRightIcon />
                                            </>
                                        );
                                    } else {
                                        return type;
                                    }
                                })()}
                            </button>
                        );
                    }

                    return <li key={index}>{children}</li>;
                })}
            </List>
        </Row>
    );
};

export default TablePagination;
