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
})(({ disableSpacing = true }) => ({
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

export default function SourceDetails({ definition, data, isLoading, viewMode = "default" }) {
    const getNestedValue = (obj, keys) =>
        keys.reduce((nestedObj, key) => (nestedObj && typeof nestedObj === "object" ? nestedObj[key] : undefined), obj);

    const dataDefinitionContainsSingleArray = !definition.some((def, i) => "title" in def);

    const renderItem = (item) => {
        if ("cell" in item) {
            const value = !isEmpty(data) ? item?.cell(data) : "-";

            return (
                <Box>
                    <Typography>{item.label}</Typography>
                    {isLoading ? (
                        <Skeleton />
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
                </Box>
            );
        }

        if ("accessorKey" in item) {
            const accessorKeys = item.accessorKey.split(".");

            const value = getNestedValue(data, accessorKeys);

            return (
                <Box>
                    <Typography color="text.secondary">{item.label}</Typography>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <Typography fontWeight={600} color="text.primary">
                            {value?.toString()?.trim() ? value : "-"}
                        </Typography>
                    )}
                </Box>
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
                                {def.title && <Typography variant="subtitle0">{def.title}</Typography>}
                                <DataContainer disableSpacing>
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
};
