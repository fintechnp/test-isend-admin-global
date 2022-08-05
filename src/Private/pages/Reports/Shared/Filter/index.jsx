import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MuiFormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import DataObjectIcon from "@mui/icons-material/DataObject";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { PDFDownloadLink } from "@react-pdf/renderer";

import DocumentPdf from "./DocumentPdf";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const DropWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        marginTop: "20px",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
    },
    "& .MuiNativeSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
        maxWidth: "130px",
    },
    "& .MuiSvgIcon-root.MuiSelect-icon": {
        color: theme.palette.border.main,
    },
}));

const ExportButton = styled(LoadingButton)(({ theme }) => ({
    opacity: 0.8,
    padding: "7px 15px",
    textTransform: "capitalize",
    "&: hover": {
        color: theme.palette.border.dark,
        opacity: 1,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

function Filter({
    handleSort,
    handleOrder,
    loading,
    success,
    title,
    state,
    sortData,
    orderData,
    csvReport,
    downloadData,
}) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!success && open) {
            downloadData();
        }
    }, [success, open]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePdf = () => {
        handleClose();
    };

    const handleXlsx = () => {
        handleClose();
    };

    return (
        <FilterWrapper>
            <HeaderWrapper>
                <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
            </HeaderWrapper>

            <DropWrapper>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                        <ExportButton
                            variant="outlined"
                            color="primary"
                            component="span"
                            sx={{ minWidth: "3px" }}
                            disableElevation
                            onClick={handleClick}
                            startIcon={
                                <SimCardDownloadOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            }
                        >
                            {loading ? "Wait.." : "Export"}
                        </ExportButton>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <PDFDownloadLink
                                onClick={handlePdf}
                                document={<DocumentPdf csvReport={csvReport} />}
                                fileName="CustomerReports.pdf"
                            >
                                <MenuItem disableRipple>
                                    <PictureAsPdfIcon />
                                    Pdf
                                </MenuItem>
                            </PDFDownloadLink>
                            <Divider sx={{ my: 0.5 }} />
                            <CSVLink {...csvReport}>
                                <MenuItem onClick={handleClose} disableRipple>
                                    <DataObjectIcon />
                                    CSV
                                </MenuItem>
                            </CSVLink>
                            <MenuItem onClick={handleXlsx} disableRipple>
                                <ListAltIcon />
                                xlsx
                            </MenuItem>
                        </StyledMenu>
                    </Box>
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select
                            onChange={handleSort}
                            displayEmpty
                            defaultValue={state.sort_by}
                            renderValue={(selected) => {
                                if (selected === "created_ts") {
                                    return (
                                        <Typography
                                            component="p"
                                            sx={{ opacity: 0.6 }}
                                        >
                                            Sort By
                                        </Typography>
                                    );
                                }
                                const value = sortData.filter(
                                    (type) => type.value === selected
                                );
                                return value[0]?.key;
                            }}
                        >
                            {sortData.map((sort) => (
                                <MenuItem value={sort.value} key={sort.value}>
                                    {sort.key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select
                            onChange={handleOrder}
                            displayEmpty
                            defaultValue={state.order_by}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <Typography
                                            component="p"
                                            sx={{ opacity: 0.6 }}
                                        >
                                            Order By
                                        </Typography>
                                    );
                                }
                                const value = orderData.filter(
                                    (type) => type.value === selected
                                );
                                return value[0]?.key;
                            }}
                        >
                            {orderData.map((order) => (
                                <MenuItem value={order.value} key={order.value}>
                                    {order.key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DropWrapper>
        </FilterWrapper>
    );
}

export default Filter;
