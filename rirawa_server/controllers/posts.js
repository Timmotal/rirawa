// says the POSt is a little bit more complicated than the users

import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */ 
export const createPost = async (req, res) => { //(01:25:00) says sum about how it works
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({ // create new post into the Database
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); // save to MongoDB
    // once we add a post, we need all the posts to be returned to the Frontend, 
    // so it has all the posts (updated) 
    const post = await Post.find(); // then grab the all the posts

    // you always have to consider what to return and how the frontend will be affected by thgat return
    // a lot of people sees frontend as easy and this is where things get hard
    // because you have to consider what the backend is sending you and format that
    // make sure that when the backend sends you the info you have to update the frontend

    // LOTS OF TIME
    // the hard part of enterprise applications is how to deal with the APIs
    // how they are sending it, and how you are formatting it
    //  sometimes you have different restrictions because of that and that's where things get hard
    
    res.status(201).json(post); // 201 reps created something
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => { // grab the posts of everyone
  try {
    const post = await Post.find();
    res.status(200).json(post); // reps successful request
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => { // grab only useer post
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// says it is probably the hardest part
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // coming from the URL 
    const { userId } = req.body; // coming from the body
    const post = await Post.findById(id); // grab post information
    // if userId exists that means post has been liked by that particular person
    const isLiked = post.likes.get(userId); // grab weather user liked a post or not

    // but is undefined  a truthy or false ? -> false sis

    // there is an object that includes a list
    // as it's key -> it gonna have all the IDs and if that exists we're going to delete it

    if (isLiked) { // this may look simple -> but it turns my brain => it's simplicity
      post.likes.delete(userId); // just tampering with the obj properties, what about true inside though?
    } else {
      post.likes.set(userId, true); // why not also delete the true
    }

    const updatedPost = await Post.findByIdAndUpdate( // how we update a specific post
      id,
      { likes: post.likes }, //pass in likes to the new post we have been modifying
      { new: true } // i didn't ask what does this even do -> 
      // it tells mongoDB to return the modified document and not the original document
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
