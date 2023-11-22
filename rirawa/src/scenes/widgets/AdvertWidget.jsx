import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Promoted
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="savesoil"
        src="https://rirawa-single-server.onrender.com/assets/info4.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Savesoilnow</Typography>
        <Typography color={medium}>savesoilnow.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Join us in safeguarding the Earth's lifeline.
       Be the change for a greener future. It starts with our Soil. #SaveOurSoil 🌱
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
