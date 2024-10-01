import { useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";

import actions from "../../store/actions";
import CheckMarkIcon from "App/components/Icon/CheckMarkIcon";

export default function ViewSmsModal() {
    const dispatch = useDispatch();

    const { is_open: isOpen, data } = useSelector((state) => state.view_sms);

    const handleClose = useCallback(() => {
        dispatch(actions.close_view_sms_modal());
    }, [dispatch]);

    return (
        <Modal open={isOpen} onClose={handleClose} title="View SMS">
            <Stack
                sx={{
                    backgroundColor: "#F7F7F8",
                }}
                padding={2}
                borderRadius="0px 16px 16px 16px "
            >
                <Typography
                    fontWeight={500}
                    sx={{
                        color: "#105BB7",
                    }}
                >
                    {data?.sms_by}
                </Typography>

                <Typography color="text.baseMain">{data?.sms_text}</Typography>

                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "4px",
                    }}
                    color="text.baseSecond"
                    fontSize="0.857rem"
                >
                    {!isEmpty(data?.created_ts) ? dateUtils.getFormattedDate(data?.created_ts) : " "}

                    <CheckMarkIcon />
                </Typography>
            </Stack>
        </Modal>
    );
}
