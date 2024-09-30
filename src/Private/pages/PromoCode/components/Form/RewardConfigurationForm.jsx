import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";

import { rewardOnEnums } from "../../data/rewardOnEnums";
import { rewardTypeEnums } from "../../data/rewardTypeEnums";
import {
    campaignRewardCatogoryEnums,
    campaignRewardCatogoryEnumsOptionsReferrer,
} from "../../data/campaignRewardCatogoryEnums";

const CellContainer = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    div: {
        flex: 1,
    },
}));

const CellDisabledFiled = styled(Box)(() => ({
    border: `1px solid rgba(5,5,5,0.4)`,
    borderRadius: "6px",
    width: 40,
    color: "rgba(5,5,5,0.4)",
    height: 36,
    display: "flex",
    justifyContent: "left",
    paddingLeft: "12px",
    paddingTop: "7px",
    cursor: "not-allowed",
}));

const RewardConfigurationForm = ({
    rewardFields,
    rewardOnOptions,
    rewardTypeOptions,
    addRewardFields,
    removeRewardFields,
}) => {
    const { watch, setValue } = useFormContext();

    const rewards = watch("Rewards");

    useEffect(() => {
        rewards.forEach((reward, index) => {
            setValue(`Rewards.${index}.rewardCategory`, campaignRewardCatogoryEnumsOptionsReferrer[0].value);
        });
    }, [rewards]);

    return (
        <>
            <Grid item xs={12}>
                <Table>
                    {rewardFields.map((field, index) => {
                        const isRewardTypeIncentive = watch(`Rewards.${index}.rewardOn`) === rewardOnEnums.INCENTIVE;
                        const isRewardTypePercentage =
                            watch(`Rewards.${index}.rewardType`) === rewardTypeEnums.PERCENTAGE;
                        return (
                            <React.Fragment key={`${field.id}_field`}>
                                {index === 0 && (
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={450}>Minimum Amount</TableCell>
                                            <TableCell width={450}>Maximum Amount</TableCell>
                                            <TableCell width={450}>Reward On</TableCell>
                                            <TableCell width={450}>Reward Type</TableCell>
                                            <TableCell width={450}>Value</TableCell>

                                            <TableCell width={450}>Limit</TableCell>

                                            <TableCell
                                                sx={{
                                                    display: "none",
                                                }}
                                                width={450}
                                            >
                                                Reward Category
                                            </TableCell>
                                            <TableCell width={200}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                )}
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    required
                                                    label="Minimum Amount"
                                                    type="number"
                                                    name={`Rewards.${index}.minimumAmount`}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    required
                                                    label="Maximum Amount"
                                                    type="number"
                                                    name={`Rewards.${index}.maximumAmount`}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        <TableCell>
                                            <CellContainer>
                                                <FormSelect
                                                    name={`Rewards.${index}.rewardOn`}
                                                    options={rewardOnOptions}
                                                    onChange={(e) => {
                                                        if (e.target.value === rewardOnEnums.INCENTIVE) {
                                                            setValue(
                                                                `Rewards.${index}.rewardType`,
                                                                rewardTypeEnums.Fixed,
                                                            );
                                                        }
                                                    }}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        <TableCell>
                                            <CellContainer>
                                                <FormSelect
                                                    name={`Rewards.${index}.rewardType`}
                                                    options={rewardTypeOptions}
                                                    disabled={isRewardTypeIncentive}
                                                    onChange={(e) => {
                                                        if (e.target.value === rewardTypeEnums.Fixed) {
                                                            setValue(`Rewards.${index}.rewardLimit`, 0);
                                                        }
                                                    }}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    required
                                                    label="Value"
                                                    type="number"
                                                    name={`Rewards.${index}.rewardValue`}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        {isRewardTypePercentage ? (
                                            <TableCell>
                                                <CellContainer>
                                                    <FormTextField
                                                        required
                                                        label="Limit"
                                                        type="number"
                                                        name={`Rewards.${index}.rewardLimit`}
                                                    />
                                                </CellContainer>
                                            </TableCell>
                                        ) : (
                                            <TableCell>
                                                <CellContainer>
                                                    <CellDisabledFiled>
                                                        <Typography sx={{ textAlign: "left" }}>Limit</Typography>
                                                    </CellDisabledFiled>
                                                </CellContainer>
                                            </TableCell>
                                        )}
                                        <TableCell
                                            sx={{
                                                display: "none",
                                            }}
                                        >
                                            <CellContainer>
                                                <FormSelect
                                                    required
                                                    type="hidden"
                                                    name={`Rewards.${index}.rewardCategory`}
                                                    options={campaignRewardCatogoryEnumsOptionsReferrer}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                        <TableCell>
                                            <CellContainer sx={{ gap: 2 }}>
                                                {index > 0 ? (
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="contained"
                                                        onClick={() => removeRewardFields(index)}
                                                    >
                                                        <CloseOutlinedIcon />
                                                    </Button>
                                                ) : (
                                                    <Button size="small" color="error" variant="contained" disabled>
                                                        <CloseOutlinedIcon />
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() =>
                                                        addRewardFields({
                                                            minimumAmount: 0,
                                                            maximumAmount: 0,
                                                            rewardOn: 0,
                                                            rewardType: 0,
                                                            rewardValue: 0,
                                                            rewardLimit: 0,
                                                            rewardCategory: campaignRewardCatogoryEnums.Referrer,
                                                        })
                                                    }
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    <AddOutlinedIcon fontSize="medium" />
                                                </Button>
                                            </CellContainer>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </React.Fragment>
                        );
                    })}
                </Table>
            </Grid>
        </>
    );
};

export default RewardConfigurationForm;
