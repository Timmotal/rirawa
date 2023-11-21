import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({ // says this is very good if you are reusing CSS as a component
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
