import mongoose from "mongoose"; // helps setup the model

// <<<<<<this is where we implement that data mapping drawn in lucid app>>>>>>>>
const UserSchema = new mongoose.Schema(
  {
    firstName: {// it will have these properties and have validation checks
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: { // says normally we would have more configurations for password, but he keeps it simple
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true } // will give us automatic dates for when it is created and updated... et cetera
);

// you want to create the Mongoose Schema first
// and then we pass it into Mongoose.model and we pass it into user

// Very important to set this up before hand 
// so you don't have to start refactoring and clearing out the mesed up data
const User = mongoose.model("User", UserSchema);
export default User;
