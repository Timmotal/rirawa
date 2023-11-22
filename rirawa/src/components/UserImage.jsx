import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "10%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://rirawa-single-server.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
