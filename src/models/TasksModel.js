const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    //Schema te ja thakbe
    title: { type: String },
    description: { type: String },
    status: { type: String },
    email: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

//mongoose theke model ke call kore
const TasksModel = mongoose.model("tasks", DataSchema);

module.exports = TasksModel;
//ProfileController kaj korbo
