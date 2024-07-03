import { useCallback } from "react";
import Stack from "@mui/material/Stack";
import Row from "App/components/Row/Row";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import dateUtils from "App/utils/dateUtils";
import Modal from "App/components/Modal/Modal";

import actions from "../../store/actions";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import getFlagUrl from "App/helpers/getFlagUrl";

export default function ViewSmsModal() {
    const dispatch = useDispatch();

    const { is_open: isOpen, data } = useSelector((state) => state.view_sms);

    const handleClose = useCallback(() => {
        dispatch(actions.close_view_sms_modal());
    }, [dispatch]);

    return (
        <Modal
            sx={{
                minWidth: "400px",
                maxWidth: "400px",
            }}
            open={isOpen}
            onClose={handleClose}
            title={
                <Row display="flex" alignItems="center" gap="4px">
                    <BadgeAvatar
                        avatarUrl={getFlagUrl(data?.sms_country_iso2)}
                        avatarDimension={20}
                        smallAvatarDimension={0}
                        style={{ margin: "auto" }}
                    />

                    <Typography type="body1">{data?.sms_to}</Typography>
                </Row>
            }
        >
            <Stack
                sx={{
                    backgroundColor: "#F7F7F8",
                }}
                // maxWidth="300px"
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
                    {dateUtils.getFormattedDate(data?.created_ts)}

                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.99984 0.166992C2.78567 0.166992 0.166504 2.78616 0.166504 6.00033C0.166504 9.21449 2.78567 11.8337 5.99984 11.8337C9.214 11.8337 11.8332 9.21449 11.8332 6.00033C11.8332 2.78616 9.214 0.166992 5.99984 0.166992ZM8.78817 4.65866L5.48067 7.96616C5.399 8.04783 5.28817 8.09449 5.1715 8.09449C5.05484 8.09449 4.944 8.04783 4.86234 7.96616L3.2115 6.31533C3.04234 6.14616 3.04234 5.86616 3.2115 5.69699C3.38067 5.52782 3.66067 5.52782 3.82984 5.69699L5.1715 7.03866L8.16984 4.04033C8.339 3.87116 8.619 3.87116 8.78817 4.04033C8.95734 4.20949 8.95734 4.48366 8.78817 4.65866Z"
                            fill="#27B973"
                        />
                    </svg>
                </Typography>
            </Stack>
        </Modal>
    );
}
