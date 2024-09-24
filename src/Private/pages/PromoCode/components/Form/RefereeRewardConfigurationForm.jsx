import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
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

import { rewardTypeEnums } from "../../data/rewardTypeEnums";
import {
    campaignRewardCatogoryEnums,
    campaignRewardCatogoryEnumsOptionsReferee,
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

const RefereeRewardConfigurationForm = ({
    refereeRewardFields,
    rewardOnOptions,
    rewardTypeOptions,
    campaignRewardEnumsOptions,
    addRefereeRewardFields,
    removeRefereeRewardFields,
}) => {
    const { control, watch, setValue } = useFormContext();

    useEffect(() => {
        refereeRewardFields.forEach((_, index) => {
            setValue(`RefereeRewards.${index}.rewardCategory`, campaignRewardCatogoryEnumsOptionsReferee[0].value);
        });
    }, [refereeRewardFields, setValue]);

    const handleAddField = () => {
        addRefereeRewardFields({
            minimumAmount: 0,
            maximumAmount: 0,
            rewardOn: 0,
            rewardType: 0,
            rewardValue: 0,
            rewardLimit: 0,
            rewardCategory: campaignRewardCatogoryEnums.Referrer,
        });
    };

    return (
        <>
            <Grid item xs={12}>
                <Table>
                    {refereeRewardFields.map((field, index) => (
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
                                            width={450}
                                            sx={{
                                                display: "none",
                                            }}
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
                                                label="Minimum Amount"
                                                type="number"
                                                name={`RefereeRewards.${index}.minimumAmount`}
                                                control={control}
                                            />
                                        </CellContainer>
                                    </TableCell>
                                    <TableCell>
                                        <CellContainer>
                                            <FormTextField
                                                label="Maximum Amount"
                                                type="number"
                                                name={`RefereeRewards.${index}.maximumAmount`}
                                                control={control}
                                            />
                                        </CellContainer>
                                    </TableCell>
                                    <TableCell>
                                        <CellContainer>
                                            <FormSelect
                                                name={`RefereeRewards.${index}.rewardOn`}
                                                options={rewardOnOptions}
                                                control={control}
                                            />
                                        </CellContainer>
                                    </TableCell>
                                    <TableCell>
                                        <CellContainer>
                                            <FormSelect
                                                name={`RefereeRewards.${index}.rewardType`}
                                                options={rewardTypeOptions}
                                                control={control}
                                            />
                                        </CellContainer>
                                    </TableCell>
                                    <TableCell>
                                        <CellContainer>
                                            <FormTextField
                                                label="Value"
                                                type="number"
                                                name={`RefereeRewards.${index}.rewardValue`}
                                                control={control}
                                            />
                                        </CellContainer>
                                    </TableCell>
                                    {watch(`RefereeRewards.${index}.rewardType`) === rewardTypeEnums.PERCENTAGE ? (
                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    label="Limit"
                                                    type="number"
                                                    name={`RefereeRewards.${index}.rewardLimit`}
                                                    control={control}
                                                />
                                            </CellContainer>
                                        </TableCell>
                                    ) : (
                                        <TableCell sx={{ visibility: "none" }}>
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
                                                name={`RefereeRewards.${index}.rewardCategory`}
                                                options={campaignRewardCatogoryEnumsOptionsReferee}
                                                control={control}
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
                                                    onClick={() => removeRefereeRewardFields(index)}
                                                >
                                                    <CloseOutlinedIcon fontSize="small" />
                                                </Button>
                                            ) : (
                                                <Button size="small" color="error" variant="contained" disabled>
                                                    <CloseOutlinedIcon />
                                                </Button>
                                            )}
                                            <Button onClick={handleAddField} variant="contained" size="small">
                                                <AddOutlinedIcon fontSize="medium" />
                                            </Button>
                                        </CellContainer>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </React.Fragment>
                    ))}
                </Table>
            </Grid>
        </>
    );
};

export default RefereeRewardConfigurationForm;
