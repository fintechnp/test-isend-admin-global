import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";

export default function FilterValueChip({ label, onDelete }) {
    return (
        <Chip
            size="small"
            sx={{
                backgroundColor: (theme) => theme.palette.surface.primarySecond,
                color: (theme) => theme.palette.primary.main,
            }}
            label={label}
            onDelete={onDelete}
        />
    );
}

FilterValueChip.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
};
