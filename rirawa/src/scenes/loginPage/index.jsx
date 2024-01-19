import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box  sx={{
      // backgroundImage: "url('https://plus.unsplash.com/premium_photo-1703689541382-8945aee7fcf8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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