import * as React from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import Form from "./Form";
import PartnerActions from "./../../../Setup/Partner/store/actions";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        maxWidth: "90%",
        [theme.breakpoints.up("md")]: {
            maxWidth: "70%",
        },
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: 0,
        },
        border: `1px solid ${theme.palette.border.main}`,
    },
}));

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const statePay = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

export default function TransactionFilter({ handleFilter }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [filterPay, setFilterPay] = React.useState(statePay);
    const { response: partner_sending } = useSelector((state) => state.get_sending_partner);
    const { response: partner_payout } = useSelector((state) => state.get_payout_partner);

    React.useEffect(() => {
        if (filterPay?.country) {
            dispatch(PartnerActions.get_payout_partner(filterPay));
        }
    }, [dispatch, filterPay]);

    React.useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
    }, [dispatch]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const submitFilter = (data) => {
        setAnchorEl(null);
        handleFilter(data);
    };
    const handlePayoutPartner = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterPay,
            country: country,
        };
        setFilterPay(updatedFilterSchema);
    };

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleClick}
                sx={{
                    color: "border.main",
                    borderColor: "border.main",
                    textTransform: "capitalize",
                    padding: "6.2px 16px",
                }}
                startIcon={<FilterAltOutlinedIcon />}
            >
                Filter
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Form
                    destroyOnUnmount
                    handlePayoutPartner={handlePayoutPartner}
                    partner_sending={partner_sending?.data || []}
                    partner_payout={partner_payout?.data || []}
                    handleClose={handleClose}
                    onSubmit={submitFilter}
                />
            </StyledMenu>
        </div>
    );
}
