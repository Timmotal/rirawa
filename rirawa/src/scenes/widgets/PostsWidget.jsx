import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); // graab the store list of posts
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://rirawa-single-server.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, // to validate the API call
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data })); //once we get D posts from the backend -> we dispatch to store
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://rirawa-single-server.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({ // he calls this destructuring -> I was confused about this with John Smilga
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id} // react needs a key
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
