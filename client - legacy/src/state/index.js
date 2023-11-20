import { createSlice } from "@reduxjs/toolkit";

// 

const initialState = {
  mode: "light",
  user: null,
  token: null,  // all the authorization info we are going to store
  posts: [], // include all the posts that we make
};

export const authSlice = createSlice({
  name: "auth", // reps the auth workflow
  initialState, // we pass in initial state into initial state
  reducers: { // this is our actions, this are functions that involve modifying the global state
    // thats the difference between this and a regular function
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // Action just like function →
      //  this is where you set the (they call it payload) 
      //  it is basically just a params argument for the function
      // action includes all the argument
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // why are we setting friends though
    setFriends: (state, action) => { // WILL SET IT INTO OUR LOCLal state
      if (state.user) {
        state.user.friends = action.payload.friends; // set friends inside our state long as user exists
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => { // says this is the most complicated one
      const updatedPosts = state.posts.map((post) => { // grab and map through the posts
        // it is going to try to find the post that just got set as the action.payload
        // in the array of state.posts and return that particular one
        // else it would just return each post as it iterates over them
        if (post._id === action.payload.post._id) return action.payload.post; // return post we want
        return post; // other wise return what we already have 

    // so we only update with the updated posts that we change and it's coming from the backend
    // we are only going to be setting that particular post everything else we leave as it currently is
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;

// Redux has this IDEA 💡 that you cant change this STATE directly,
//  you wanna replace the object as opposed to directly modifying the state

// - Toolkit has this Built-In Library (one thing he might not agree with)
//  where you can act like you modified the state directly ⇒ 
//  though under the hood, this is not what is happening
// - state.mode reps the  previous condition
//     - AND WHAT YOU set it to will be the new STATE  when you call this function

// these are simple function that modify our state as we need -> setSumSh*t