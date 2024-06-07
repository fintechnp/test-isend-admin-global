import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import MuiTablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import usePagination from "@mui/material/usePagination";
import { Height } from "@mui/icons-material";
import Row from "../Row/Row";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Center from "../Center/Center";
import { buttonBorderRadius, fonts } from "App/theme/theme";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

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

const ROWS_PER_PAGE_OPTIONS = [10, 15, 25, 50, 100];

const TablePagination = ({ paginationData, handleChangePage, handleChangeRowsPerPage }) => {
    const { items } = usePagination({
        page: +paginationData?.currentPage || 1,
        count: +paginationData?.totalPage || 0,
        onChange: (e, newPage) => handleChangePage?.(e, newPage - 1),
    });

    return (
        <Row justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500}>Total Records: {paginationData?.totalCount || 0}</Typography>
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

    // return (
    //     <>
    //         <Pagination count={10} variant="outlined" shape="rounded" />
    //         <MuiTablePagination
    //             component="div"
    //             count={+paginationData?.totalCount || 10}
    //             page={+paginationData?.currentPage - 1 || 0}
    //             onPageChange={handleChangePage}
    //             rowsPerPage={+paginationData?.pageSize || 15}
    //             rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
    //             onRowsPerPageChange={handleChangeRowsPerPage}
    //         />
    //     </>
    // );
};

export default TablePagination;
