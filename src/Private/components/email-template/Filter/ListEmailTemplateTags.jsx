import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import emailTemplateActions from "Private/components/email-template/store/emailTemplateActions";
import range from "App/helpers/range";

export default function ListEmailTemplateTags() {
    const dispatch = useDispatch();

    const { response, loading, error } = useSelector((state) => state.get_email_template_tags);

    const ResponseData = response?.data;

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_template_tags());
    }, [dispatch]);

    if (error) return <Typography color="error">Failed to load data</Typography>;

    return (
        <Box
            sx={{
                maxHeight: 600,
                overflow: "auto",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#f9f9f9",
                minWidth: 500,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    padding: "0.4rem",
                    marginBottom: "0.4rem",
                    border: "1px solid #ccc",
                    background: "#f3f3f3",
                    borderRadius: "4px",
                    textAlign: "center",
                }}
            >
                Email Template Tags
            </Typography>
            {loading
                ? range(1, 5).map((index) => (
                      <Stack
                          key={index}
                          sx={{
                              marginBottom: 1,
                              padding: "0.4rem",
                              borderRadius: "4px",
                          }}
                      >
                          <Skeleton variant="text" height={30} />
                          <Skeleton variant="text" height={20} />
                      </Stack>
                  ))
                : ResponseData?.map((item) => (
                      <Stack
                          sx={{
                              marginBottom: 1,
                              background: "#5b98d9",
                              padding: "0.4rem",
                              color: "#fff",
                              borderRadius: "4px",
                          }}
                          key={item?.tag_id}
                      >
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>
                              {item?.tag_name}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 400 }}>
                              {item?.description}
                          </Typography>
                      </Stack>
                  ))}
        </Box>
    );
}
