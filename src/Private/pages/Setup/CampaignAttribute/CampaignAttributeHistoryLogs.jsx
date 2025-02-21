import React, { useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import Typography from "@mui/material/Typography";
import TimelineContent from "@mui/lab/TimelineContent";
import { useDispatch, useSelector } from "react-redux";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";

import range from "App/helpers/range";
import dateUtils from "App/utils/dateUtils";
import routePaths from "Private/config/routePaths";
import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

const CampaignAttributeHistoryLogs = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { response, loading } = useSelector((state) => state.get_attribute_family_logs);

    useEffect(() => {
        dispatch(attributeFamilyActions.get_attribute_family_logs(params.id));
    }, []);

    const TimelineLoader = () => {
        return range(1, 5).map((_, index) => (
            <TimelineItem key={index + "skeleton"}>
                <TimelineOppositeContent>
                    <Skeleton variant="text" width={240} height={20} />
                    <Skeleton variant="text" width={210} height={20} />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector sx={{ border: "1px dashed #ccc", backgroundColor: "transparent" }} />
                </TimelineSeparator>
                <TimelineContent>
                    <Skeleton variant="text" width={240} height={20} />
                    <Skeleton variant="text" width={210} height={20} />
                </TimelineContent>
            </TimelineItem>
        ));
    };

    return (
        <PageContent
            documentTitle="Campaign Attribute History"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Campaign Attribute Family",
                    link: routePaths.ListCampaignAttribute,
                },
                {
                    label: "History Logs",
                },
            ]}
        >
            <PageContentContainer title="History Logs">
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                        },
                    }}
                >
                    {loading ? <TimelineLoader /> : renderTimeline()}
                </Timeline>
            </PageContentContainer>
        </PageContent>
    );

    function renderTimeline() {
        return response?.data?.data?.length === 0 ? (
            <Typography>History logs Not Found</Typography>
        ) : (
            response?.data?.data?.map((item, index) => (
                <TimelineItem key={index + "history"}>
                    <TimelineOppositeContent>
                        <Typography>{dateUtils.getFormattedDate(item.createdTs)}</Typography>
                        <Typography>{item.createdName}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector sx={{ border: "1px dashed #ccc", backgroundColor: "transparent" }} />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography sx={{ fontSize: "medium", color: "#000" }}>{item.attributeName}</Typography>
                        <Typography sx={{ fontSize: "small" }}>{item.attributeType}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))
        );
    }
};

export default CampaignAttributeHistoryLogs;
