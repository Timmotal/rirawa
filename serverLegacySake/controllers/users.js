import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // grab the information of the user
    res.status(200).json(user); // send all the information of that user to the frontend
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// grab all the user friends of the ID specified
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // find ID of the user

    //  we are gona make multiple APi calls to the Database
    const friends = await Promise.all(
      // grab all the information from the friend ID
      // so now after getting this particular user friends, map over them & get their IDs 
      // and find these ID in the User Schema in the DataBase and return them in an array
      user.friends.map((id) => User.findById(id))
    );
    console.log(friends + "I am guessing it is an object, this is why we destructure while mapping")
    const formattedFriends = friends.map( // format this properly for the Frontend
    // so we wanna modify our schema a little bit before sending it back to the frontend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        // I wonder why we just didnt map it straight onto the database
        // because we gotta destructure we dont want all the properties (check though)

        // now that we that we return those properties into an object , 
        // i do not know what is happening again
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    //  he says a kind of tenuous logic
    if (user.friends.includes(friendId)) {
      // now take user.friends and then return id for all except where it equal to friendId
      user.friends = user.friends.filter((id) => id !== friendId); // copy the array anytime it's not this
      // what is happening here sis -> sounds lame to me
      //  says we remove the (this current) user from their friend list
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id); // see here but why are we touching the friend
      // we touch friend because we are making the logic similar to facebook
    }
    await user.save(); // save the list on user and that friend
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map( // we then format friends for the frontend again
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
