import { useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import CheckMarkIcon from "App/components/Icon/CheckMarkIcon";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";
import Column from "App/components/Column/Column";

import actions from "../../store/actions";
import { emailStatus } from "../../Sms/data/emailStatus";

export default function ViewEmailModal() {
    const dispatch = useDispatch();

    const { is_open: isOpen, data } = useSelector((state) => state.view_email);

    const handleClose = useCallback(() => {
        dispatch(actions.close_view_email_modal());
    }, [dispatch]);

    return (
        <Modal
            sx={{
                minWidth: "600px",
                maxWidth: "900px",
            }}
            open={isOpen}
            onClose={handleClose}
            title={data?.email_subject}
        >
            <Row
                container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
                padding={2}
            >
                <Column>
                    <Column>
                        <Typography color="text.baseMain" fontWeight={600}>
                            {data?.email_by}
                        </Typography>
                    </Column>

                    <Column gap="4px" sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography color="text.secondary">To</Typography>
                        <Typography color="text.secondary">{data?.email_to}</Typography>
                    </Column>
                </Column>

                <Column sx={{ textAlign: "right", alignItems: "center" }}>
                    <Typography color="text.baseSecond" fontSize="0.857rem">
                        {dateUtils.getFormattedDate(data?.created_ts)}

                        {data?.status === emailStatus.SENT ? <CheckMarkIcon /> : <></>}
                    </Typography>
                </Column>
            </Row>

            <Box
                sx={{
                    backgroundColor: "#F7F7F8",
                }}
                gap={4}
                dangerouslySetInnerHTML={{ __html: data?.email_body }}
            ></Box>
        </Modal>
    );
}
