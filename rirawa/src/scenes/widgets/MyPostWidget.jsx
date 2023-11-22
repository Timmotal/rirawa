import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  // reps D switch weather someone has clicked D img btn to openup a place to drop the image is preferd
  const [image, setImage] = useState(null); 
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user); // this is sth we can send to B.E to knw who psted
  const token = useSelector((state) => state.token); // auth user to call the API
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData(); // so we can pass the image
    formData.append("userId", _id); // append some properties manually
    formData.append("description", post); // as with this also -> append some properties manually
    if (image) {
      formData.append("picture", image); // the B.E grabs this
      formData.append("picturePath", image.name); // will determine the path
    }

    const response = await fetch(`https://rirawa-single-server.onrender.com/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);// to reset all the states that we have, once we make an API call
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Share your thoughts"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone // this is what gets displayed when we click add image
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : ( 
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && ( // only display trash icon if there is an image available -> awesome
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* this turns off and open the image drop zone -> makes me remember ZTM ADV JS  */}
        <FlexBetween 
          gap="0.25rem" onClick={() => setIsImage(!isImage)}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}   > Image  </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween 
              gap="0.25rem" onClick={() => setIsImage(!isImage)}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography  color={mediumMain} >Clip</Typography>
            </FlexBetween>

            <FlexBetween 
              gap="0.25rem" onClick={() => setIsImage(!isImage)}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography  color={mediumMain}  >Attachment</Typography>
            </FlexBetween>

            <FlexBetween 
              gap="0.25rem" onClick={() => setIsImage(!isImage)}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography  color={mediumMain}  >Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
