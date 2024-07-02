import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";

import range from "App/helpers/range";

export default function Documents({ data = [], isLoading = false }) {
    return (
        <>
            <Typography variant="subtitle0">Documents</Typography>
            <Row gap={1}>
                {isLoading ? (
                    <>
                        {range(1, 2).map((i) => (
                            <Skeleton key={i} height="200px" width="200px" />
                        ))}
                    </>
                ) : (
                    <>
                        {data?.map((item, i) => {
                            return (
                                <Box key={i}> 
                                    <Typography variant="subtitle1" mb={1}>
                                        {item?.documentName}
                                    </Typography>
                                    <a href={item?.documentLink} target="_blank">
                                        <img
                                            src={item?.documentLink}
                                            alt={item?.documentName}
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </a>
                                </Box>
                            );
                        })}
                    </>
                )}

                {!isLoading && data.length === 0 && <>No documents available.</>}
            </Row>
        </>
    );
}

Documents.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            documentLink: PropTypes.string.isRequired,
            documentName: PropTypes.string.isRequired,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};
