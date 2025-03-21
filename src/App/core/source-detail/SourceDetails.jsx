import { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import isEmpty from "App/helpers/isEmpty";

const DefaultContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "disableSpacing",
})(({ disableSpacing = false }) => ({
    display: "flex",
    flexWrap: "wrap",
    ...(!disableSpacing
        ? {
              gap: "40px",
              mt: "8px",
          }
        : undefined),
}));

const ColumnContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    mt: "8px",
    flexWrap: "wrap",
}));

const LabelValueContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "rowMode" && prop !== "disableLabelColon",
})(({ theme, mode, disableLabelColon = true }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    ...(mode === "row"
        ? {
              flexDirection: "row",
              alignItems: "center",
          }
        : undefined),
    ...(!disableLabelColon
        ? {
              "& .MuiLabel-root:after": {
                  content: '" :"',
              },
          }
        : undefined),
}));

export default function SourceDetails({
    definition,
    data,
    isLoading,
    viewMode = "default",
    rowMode = "column",
    disableLabelColon = true,
}) {
    const getNestedValue = (obj, keys) =>
        keys.reduce((nestedObj, key) => (nestedObj && typeof nestedObj === "object" ? nestedObj[key] : undefined), obj);

    const dataDefinitionContainsSingleArray = !definition.some((def, i) => "title" in def);

    const renderItem = (item) => {
        if ("cell" in item) {
            const value = !isEmpty(data) ? item?.cell(data) : "-";

            return (
                <LabelValueContainer mode={rowMode} disableLabelColon={disableLabelColon}>
                    <Typography className="MuiLabel-root" color="text.secondary">
                        {item.label}
                    </Typography>
                    {isLoading ? (
                        <Skeleton width="20px" />
                    ) : (
                        <Box>
                            {typeof value === "string" ? (
                                <Typography fontWeight={600} color="text.primary">
                                    {value}
                                </Typography>
                            ) : (
                                value
                            )}
                        </Box>
                    )}
                </LabelValueContainer>
            );
        }

        if ("accessorKey" in item) {
            const accessorKeys = item.accessorKey.split(".");

            const value = getNestedValue(data, accessorKeys);

            return (
                <LabelValueContainer mode={rowMode} disableLabelColon={disableLabelColon}>
                    <Typography className="MuiLabel-root" color="text.secondary">
                        {item.label}
                    </Typography>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <Typography fontWeight={600} color="text.primary">
                            {value?.toString()?.trim() ? value : "-"}
                        </Typography>
                    )}
                </LabelValueContainer>
            );
        }

        return <> </>;
    };

    let DataContainer = DefaultContainer;

    if (viewMode === "column") DataContainer = ColumnContainer;

    return (
        <DataContainer
            disableSpacing={!dataDefinitionContainsSingleArray}
            sx={{
                "& .MuiTypography-root": {
                    lineHeight: "1.429rem",
                    whiteSpace: "nowrap",
                },
            }}
        >
            {definition.map((def, i) => {
                if ("title" in def) {
                    return (
                        <Box key={i} width="100%">
                            <Box>
                                <Box mb="8px">
                                    {def.title && <Typography variant="subtitle0">{def.title}</Typography>}
                                </Box>
                                <DataContainer>
                                    {def.items.map((item, ik) => (
                                        <Fragment key={ik}>{renderItem(item)}</Fragment>
                                    ))}
                                </DataContainer>
                            </Box>
                            {i < definition.length - 1 ? (
                                <Box my="16px">
                                    <Divider />
                                </Box>
                            ) : (
                                ""
                            )}
                        </Box>
                    );
                }

                return <DataContainer key={i}>{renderItem(def)}</DataContainer>;
            })}
        </DataContainer>
    );
}

SourceDetails.propTypes = {
    definition: PropTypes.array,
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    viewMode: PropTypes.oneOf(["default", "column"]),
    disableLabelColon: PropTypes.bool,
    rowMode: PropTypes.oneOf(["column", "row"]),
};
