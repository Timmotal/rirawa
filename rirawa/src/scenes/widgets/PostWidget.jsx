import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";


// <<<<<<<--- SAYS THE POSTs WIDGET IS PROBABLY THE HARDEST PART ----->>>>>>>>>>>>

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  // being more explicit -> we already have userId and & friendID
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]); // says this is a lil confusing
  // if the userId already exists in this object 
  // then we can check if they exist to see if this current user has liked it or not
  // likes = {
  //   "userId1": true,
  //   "userId2": true,
  // }
  const likeCount = Object.keys(likes).length; 
  // why not just like.array.length(and convert to integer)
  // GPT says it is not an array it is an object -> as it indeed is sis

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => { // change the number of likes
    const response = await fetch(`https://rirawa-single-server.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // pass in the current userId to know if this user has liked the post
      body: JSON.stringify({ userId: loggedInUserId }), 
    });
    const updatedPost = await response.json(); // gives us the updated post from the backend
    dispatch(setPost({ post: updatedPost })); //then dispatch the change made to this post to the store
    // console.log(postUserId)
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img // the POST picture
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://rirawa-single-server.onrender.com/assets/${picturePath}`}
        />
      )}
      {/* THE LIKE SECTION */}
      <FlexBetween mt="0.25rem">

      <IconButton>
          <ShareOutlined />
        </IconButton>

        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? ( // determines weather someone has liked the icon button or not
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            {/* displays how many likes there are */}
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* THE COMMENT SECTION */}
          <FlexBetween gap="0.3rem">
            {/* this is for opening and removing the comment section */}
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            {/* determines the number of comment */}
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* <IconButton>
          <ShareOutlined />
        </IconButton> */}
      </FlexBetween>
      
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            // we added name to the index "i" to make the key unique
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
