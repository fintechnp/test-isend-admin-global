import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";

import useCopyTextToClipboard from "App/hooks/useCopyTextToClipboard";

const StyledIconButton = styled(IconButton)({
    marginRight: "0.5rem",
    "& .MuiSvgIcon-root": {
        fontSize: "1rem",
    },
});

const ClipboardContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
});

function Clipboard({ content, label, tooltipTitle, tooltipPlacement }) {
    const copyText = useCopyTextToClipboard();

    return (
        <ClipboardContainer>
            <div style={{ wordBreak: "break-all" }}>{label ? label : content}</div>
            <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
                <StyledIconButton
                    sx={{ m: 0 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        copyText(content);
                    }}
                >
                    <ContentCopyTwoToneIcon />
                </StyledIconButton>
            </Tooltip>
        </ClipboardContainer>
    );
}

export default Clipboard;

Clipboard.propTypes = {
    content: PropTypes.string.isRequired,
    label: PropTypes.string,
    tooltipTitle: PropTypes.string,
    tooltipPlacement: PropTypes.oneOf(["left", "right", "top", "bottom"]),
};

Clipboard.defaultProps = {
    label: undefined,
    tooltipTitle: "Copy",
    tooltipPlacement: "right",
};
