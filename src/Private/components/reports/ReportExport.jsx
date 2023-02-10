import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DataObjectIcon from "@mui/icons-material/DataObject";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FormControlLabel from "@mui/material/FormControlLabel";

import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import { useConfirm } from "App/core/mui-confirm";
import StyledMenu from "App/components/Menu/StyledMenu";
import Spacer from "App/components/Spacer/Spacer";

const exportFormats = {
    PDF: "pdf",
    CSV: "csv",
    XLSX: "xlsx",
};

export default function ReportExport({ columns, apiEndpoint, filterQueryString }) {
    const [exportColumns, setExportColumns] = useState(columns);

    const [activeExportContext, setActiveExportContext] = useState();

    const confirm = useConfirm();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //
    const handleChange = (e, name) => {
        const updatedExportColumns = exportColumns.map((c) => {
            if (c.name === name) {
                console.log(c, {
                    ...c,
                    [c[activeExportContext]]: !e.target.checked,
                });
                return {
                    ...c,
                    [c[activeExportContext]]: !e.target.checked,
                };
            }
            return c;
        });
        setExportColumns(updatedExportColumns);
    };

    const handleCloseModal = (e) => {
        confirm().then(() => {
            setActiveExportContext(undefined);
        });
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                onClick={handleClick}
                startIcon={<ImportExportIcon />}
            >
                Export
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        setActiveExportContext(exportFormats.PDF);
                        handleClose();
                    }}
                    disableRipple
                >
                    <PictureAsPdfIcon />
                    PDF
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setActiveExportContext(exportFormats.CSV);
                        handleClose();
                    }}
                    disableRipple
                >
                    <DataObjectIcon />
                    CSV
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setActiveExportContext(exportFormats.XLSX);
                        handleClose();
                    }}
                    disableRipple
                >
                    <ListAltIcon />
                    XLSX
                </MenuItem>
            </StyledMenu>
            <Modal
                title={<Typography variant="h6">Export to {activeExportContext?.toUpperCase()}</Typography>}
                open={!!activeExportContext}
                onClose={handleCloseModal}
            >
                <Box display="flex" flexDirection="column">
                    <Typography>Select columns to export</Typography>
                    <Divider />
                    <Box display="flex" flexDirection="column" sx={{ maxHeight: "80vh   ", overflowY: "scroll" }}>
                        {columns.map((col, i) => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        checked={col[activeExportContext] ?? false}
                                        onChange={(e) => handleChange(e, col.name)}
                                    />
                                }
                                label={col.label}
                            />
                        ))}
                    </Box>
                    <Spacer />
                    <Button>Export to {activeExportContext?.toUpperCase()}</Button>
                </Box>
            </Modal>
        </div>
    );
}

ReportExport.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            name: PropTypes.string.isRequired,
            accessor: PropTypes.func,
            pdf: PropTypes.bool,
            csv: PropTypes.bool,
            xlsx: PropTypes.bool,
        }),
    ).isRequired,
    apiEndpoint: PropTypes.string.isRequired,
    filterQueryString: PropTypes.object,
};

ReportExport.defaultProps = {
    filterQueryString: {},
};
