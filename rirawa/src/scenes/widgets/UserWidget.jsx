import {
  ManageAccountsOutlined,
  PeopleAlt,
  WorkOutlineOutlined,
  ForumOutlined,
  HomeOutlined,
  AccountBoxRounded
} from "@mui/icons-material";

// import  from '@mui/icons-material/PeopleAlt';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage"; 
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";// we can import 4rm "component" as opposed to relative imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => { // grab user from API
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser(); // will be invoked when you render the component the first time
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) { // typically we would have a loading component
    return null; // some work for me (03:47:00)
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // where will this take us -> Prefix URL? => it is in the app.js
        onClick={() => navigate(`/profile/${userId}`)} 
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Chums</Typography>
          </Box>
        </FlexBetween>
        <AccountBoxRounded />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <HomeOutlined fontSize="large" sx={{ color: main }} />
          
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">

          <ForumOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Forums</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>


      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Online Personas
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" style={{ width: '24px' }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>It's what's happening</Typography>
            </Box>
          </FlexBetween>
          
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/pinterest.png" alt="twitter" style={{ width: '24px' }} />
            <Box>
              <Typography color={main} fontWeight="500">
              Pinterest
              </Typography>
              <Typography color={medium}>Discover and explore new ideas</Typography>
            </Box>
          </FlexBetween>
          <PeopleAlt sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/youtube2.png" alt="twitter" style={{ width: '24px' }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Youtube
              </Typography>
              <Typography color={medium}>Share your videos</Typography>
            </Box>
          </FlexBetween>
          <PeopleAlt sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/facebook.png" alt="twitter" style={{ width: '24px' }} />
            <Box>
              <Typography color={main} fontWeight="500">
              Facebook
              </Typography>
              <Typography color={medium}>Connect with friends</Typography>
            </Box>
          </FlexBetween>
          <PeopleAlt sx={{ color: main }} />
        </FlexBetween>

        

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/instagram.png" alt="instagram" style={{ width: '24px' }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>Creative way to capture</Typography>
            </Box>
          </FlexBetween>
          <PeopleAlt sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Keep in touch</Typography>
            </Box>
          </FlexBetween>
          <PeopleAlt sx={{ color: main }} />
        </FlexBetween>
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Analytics</Typography>
          <Typography color={main} fontWeight="500">
            {/* change this to random  -> it makes moe sense to come from the backend though*/}
            {Math.floor(Math.random() * (12332 - 128 + 1) + 128)}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions</Typography>
          <Typography color={main} fontWeight="500">
            {Math.floor(Math.random() * (894578 - 578 + 1) + 578)}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
