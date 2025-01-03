import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const ViewContentBoxWrapper = styled(Box)(({ theme }) => ({
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    whiteSpace: "pre-wrap",
    overflowX: "hidden",
    overflowY: "scroll",
    textOverflow: "ellipsis",
    maxHeight: "28.571rem",
    textAlign: "justify",

    padding: "8px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    lineHeight: 1.5,
    "& ul": {
        marginLeft: "1.429rem",
        paddingLeft: "1.429rem",
        listStyleType: "disc",
    },
    "& ol": {
        marginLeft: "1.429rem",
        paddingLeft: "1.429rem",
        listStyleType: "decimal",
    },
    "& li": {
        marginBottom: "0.357rem",
    },
    "& p": {
        margin: "0.357rem 0",
    },
}));

const ListContentBoxWrapper = styled(Box)(({ theme }) => ({
    all: "unset",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textAlign: "justify",
    textOverflow: "ellipsis",
    maxWidth: "200px",
    marginLeft: 10,

    "& ul": {
        marginLeft: "1.429rem",
        paddingLeft: "1.429rem",
    },
    "& ol": {
        marginLeft: "1.429rem",
        paddingLeft: "1.429rem",
    },
    "& li": {
        marginBottom: "0.357rem",
    },
    "& p": {
        margin: "0.357rem 0",
    },
}));

const TitleContentBoxWrapper = styled(Box)(({ theme }) => ({
    all: "unset",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
}));

export const ButtonContentWrapper = styled(Box)(({ theme }) => ({
    Display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
}));

export const ViewContentBox = ({ content }) => {
    return <ViewContentBoxWrapper dangerouslySetInnerHTML={{ __html: content }} />;
};

export const ListContentBox = ({ content }) => {
    return <ListContentBoxWrapper dangerouslySetInnerHTML={{ __html: content }} />;
};

export const TitleContentBox = ({ content }) => {
    return <TitleContentBoxWrapper>{content}</TitleContentBoxWrapper>;
};
