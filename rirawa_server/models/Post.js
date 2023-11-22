import mongoose from "mongoose";
// ## Data Modelling → A little bit Advanced

// lots of Trial & Error → then you start to see a different pattern

// - Likes & Comments are the two most complicated things

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map, // typically you use an object -> but this will be this, that's how MongoDB saves it
      of: Boolean,
      // all we need to do is to check if the user ID exists in this Map
      //  and the value will be true always if it exists
      //  so if you like it ( a post I presume), you add to this map...like wise otherwise
      // DIDN'T USE AN ARRAY OF STRINGS  of userId -> map is more performant & efficient (01:23:00)
      //  to see if they liked it or not
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
