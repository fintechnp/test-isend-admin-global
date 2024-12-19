import * as XLSX from "xlsx";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import * as FileSaver from "file-saver";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled, alpha } from "@mui/material/styles";
import MuiFormControl from "@mui/material/FormControl";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

import ExportToPdf from "./ExportToPdf";
import ExportToCsv from "./ExportToCsv";
import ExportToExcel from "./ExportToExcel";
import { PdfDocument } from "./ExportToPdf";
import dateUtils from "App/utils/dateUtils";
import { CurrencyName, ReferenceName } from "App/helpers";

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
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
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
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
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
    show,
    handleShow,
    showData,
    handleSort,
    handleOrder,
    loading,
    success,
    title,
    state,
    sortData,
    orderData,
    csvReport,
    fileName,
    downloadData,
    exportColumns,
    menu,
    custompdfTable,
}) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (csvReport?.data && csvReport.data.length > 0) {
            const formattedData = csvReport?.data?.map((item) => ({
                ...Object.fromEntries(
                    Object.entries(item)?.map(([key, value]) => [key, value === null || value === "" ? "N/A" : value]),
                ),
                created_ts: item.created_ts
                    ? dateUtils.getFormattedDate(item.created_ts, "MM/DD/YYYY  hh:mm A")
                    : item.created_ts,
                updated_ts: item.updated_ts
                    ? dateUtils.getFormattedDate(item.updated_ts, "MM/DD/YYYY hh:mm A")
                    : item.updated_ts,
                ...(item?.refund_ts && { refund_ts: dateUtils.getFormattedDate(item.refund_ts) }),
                ...(item?.payment_type && { payment_type: ReferenceName(1, item.payment_type) }),
            }));

            if (success && down === "xlsx") {
                const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const fileExtension = ".xlsx";
                const ws = XLSX.utils.json_to_sheet(formattedData);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, fileName + fileExtension);
                dispatch({ type: "DOWNLOAD_REPORT_RESET" });
                setDown(null);
            } else if (success && down === "csv") {
                const fileExtension = ".csv";
                const ws = XLSX.utils.json_to_sheet(formattedData);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
                const data = new Blob([excelBuffer], { type: "text/csv" });
                FileSaver.saveAs(data, fileName + fileExtension);
                dispatch({ type: "DOWNLOAD_REPORT_RESET" });
                setDown(null);
            } else if (success && down === "pdf") {
                const generatePdfDocument = async (csvReport, fileName) => {
                    const blob = await pdf(
                        <PdfDocument csvReport={csvReport} customPdfTable={custompdfTable} />,
                    ).toBlob();
                    FileSaver.saveAs(blob, fileName);
                    dispatch({ type: "DOWNLOAD_REPORT_RESET" });
                    setDown(null);
                };
                generatePdfDocument({ ...csvReport, data: formattedData }, fileName);
            }
        }
    }, [csvReport?.data, fileName, down, success]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <FilterWrapper>
            <HeaderWrapper>
                <Typography sx={{ fontSize: "1.2rem" }}>{title}</Typography>
            </HeaderWrapper>
            {!menu ? (
                <Box display="flex" columnGap="16px">
                    <ExportToPdf
                        setDown={setDown}
                        handleClose={handleClose}
                        downloadData={downloadData}
                        downloading={loading}
                    >
                        <> {loading && down === "pdf" ? "Exporting..." : "PDF"}</>
                    </ExportToPdf>
                    <ExportToExcel
                        setDown={setDown}
                        handleClose={handleClose}
                        downloadData={downloadData}
                        downloading={loading}
                    >
                        <> {loading && down === "xlsx" ? "Exporting..." : "Excel"}</>
                    </ExportToExcel>
                </Box>
            ) : (
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
                                {loading ? "Downloading" : "Export"}
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
                                <ExportToPdf
                                    setDown={setDown}
                                    handleClose={handleClose}
                                    downloadData={downloadData}
                                    menu
                                />
                                <ExportToCsv setDown={setDown} handleClose={handleClose} downloadData={downloadData} />
                                <ExportToExcel
                                    setDown={setDown}
                                    handleClose={handleClose}
                                    downloadData={downloadData}
                                    menu
                                />
                            </StyledMenu>
                        </Box>
                        {handleShow && (
                            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                                <Select
                                    onChange={handleShow}
                                    displayEmpty
                                    defaultValue={show}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <Typography component="p" sx={{ opacity: 0.6 }}>
                                                    Filter
                                                </Typography>
                                            );
                                        }
                                        const value = showData.filter((type) => type.value === selected);
                                        return value[0]?.key;
                                    }}
                                >
                                    {showData.map((sort) => (
                                        <MenuItem value={sort.value} key={sort.value}>
                                            {sort.key}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {sortData && (
                            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                                <Select
                                    onChange={handleSort}
                                    displayEmpty
                                    defaultValue={state.sort_by}
                                    renderValue={(selected) => {
                                        if (selected === "created_ts") {
                                            return (
                                                <Typography component="p" sx={{ opacity: 0.6 }}>
                                                    Sort By
                                                </Typography>
                                            );
                                        }
                                        const value = sortData.filter((type) => type.value === selected);
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
                        )}

                        {orderData && (
                            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                                <Select
                                    onChange={handleOrder}
                                    displayEmpty
                                    defaultValue={state?.order_by}
                                    renderValue={(selected) => {
                                        if (selected?.length === 0) {
                                            return (
                                                <Typography component="p" sx={{ opacity: 0.6 }}>
                                                    Order By
                                                </Typography>
                                            );
                                        }
                                        const value = orderData.filter((type) => type.value === selected);
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
                        )}
                    </Box>
                </DropWrapper>
            )}
        </FilterWrapper>
    );
}

export default Filter;
