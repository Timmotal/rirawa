import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box  sx={{
      backgroundImage: "url('https://img.topfapgirls.com/1/14/13796/lil-braids-lilbraids/lil-braids-lilbraids-188-1080px.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <Box
   
   >
     <Box
      
     //  backgroundImage: `url(path/to/your/image.jpg)`,
     //  backgroundRepeat: 'no-repeat', // Prevent image repetition
     //  backgroundSize: 'cover',      // Cover the entire box with the image
       width="100%"
       backgroundColor={theme.palette.background.alt}
       p="1rem 6%"
       textAlign="center"
     >
       <Typography fontWeight="bold" fontSize="32px" color="primary">
       <img 
           src={theme.palette.mode === "dark" ? "../assets/logoLite.png" : "../assets/logo.png"} 
           alt="logo" 
           style={{ width: '120px' }}
           onClick={() => navigate("/home")} 
         />
       </Typography>
     </Box>

     <Box
       width={isNonMobileScreens ? "50%" : "93%"}
       p="2rem"
       m="2rem auto"
       borderRadius="1.5rem"
       backgroundColor={theme.palette.background.alt}
     >
       <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
       Yo ho ho! Greetings to you!!
       </Typography>
       <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
       Copy and paste 'wonderwoman' as G-Mail and Password if you do not want to sign up.
       </Typography>
       <Form />
     </Box>
   </Box>
    </Box>
  );
};

export default LoginPage;