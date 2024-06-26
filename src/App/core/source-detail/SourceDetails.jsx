import PropTypes from "prop-types";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import isEmpty from "App/helpers/isEmpty";

export default function SourceDetails({ definition, data, isLoading }) {
    const getNestedValue = (obj, keys) =>
        keys.reduce((nestedObj, key) => (nestedObj && typeof nestedObj === "object" ? nestedObj[key] : undefined), obj);

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

    return (
        <Box
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
                        <Box key={i}>
                            <Box>
                                {def.title && <Typography variant="subtitle0">{def.title}</Typography>}
                                <Box display="flex" gap="40px" mt="8px" flexWrap="wrap">
                                    {def.items.map((item, ik) => (
                                        <Fragment key={ik}>{renderItem(item)}</Fragment>
                                    ))}
                                </Box>
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

                return <Fragment key={i}>{renderItem(def)}</Fragment>;
            })}
        </Box>
    );
}

SourceDetails.propTypes = {
    definition: PropTypes.array,
    data: PropTypes.object,
    isLoading: PropTypes.bool,
};
