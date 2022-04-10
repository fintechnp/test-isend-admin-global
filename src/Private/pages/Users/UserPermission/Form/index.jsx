import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Field, change } from "redux-form";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import CheckboxField from "../../../../../App/components/Fields/CheckboxField";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "0px",
    },
    header: {
        color: "#090269",
        fontSize: "18px",
        textTransform: "uppercase",
    },
    content: {
        margin: "0px",
        width: "100%",
        padding: "18px",
        backgroundColor: "#fff",
    },
    label: {
        textAlign: "left",
    },
    card: {
        margin: 0,
        width: "100%",
        border: "none",
        boxShadow: "none",
    },
}));

const Check = ({ fields, ind, meta: { error } }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        fields.unshift({ is_active: false, sub_title: "All" });
    }, []);

    const handleAll = (e, index) => {
        function toBool(string) {
            if (string === "true") {
                return true;
            } else {
                return false;
            }
        }
        if (!index) {
            fields.getAll().map((each, num) => {
                dispatch(
                    change(
                        "create_permission_form",
                        `menu[${ind}].sub_menu[${num}].is_active`,
                        !toBool(e.target.value)
                    )
                );
            });
        }
    };

    return (
        <Grid container className={classes.container}>
            {fields.map((sub_menu, index) => (
                <Grid item xs={12}>
                    <Field
                        key={index}
                        name={`${sub_menu}.is_active`}
                        type="text"
                        half={true}
                        reverse="row-reverse"
                        onChange={(e) => handleAll(e, index)}
                        checked={fields.get(index)?.is_active}
                        component={CheckboxField}
                        label={fields.get(index)?.sub_title}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Check;
