const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    //Schema te ja thakbe
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String, unique: true },
    City: { type: String },
    UserName: { type: String, unique: true },
    Password: { type: String },
  },
  { versionKey: false }
);

//mongoose theke model ke call kore
const ProfileModel = mongoose.model("Profile", DataSchema);

module.exports = ProfileModel;
//ProfileController kaj korbo
