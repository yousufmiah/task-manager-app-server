const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

//api.js file use korbo
//profile create
exports.CreateProfile = (req, res) => {
  //user er kaj theke je request pabo
  const reqBody = req.body;

  //ProfileModel theke create method ke call kobo er modde je request ta pabo seta dibo
  ProfileModel.create(reqBody, (error, data) => {
    if (error) {
      res.status(404).json({ status: "fail", data: error });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

//find userLogin
exports.UserLogin = (req, res) => {
  const UserName = req.body["UserName"];
  const Password = req.body["Password"];

  ProfileModel.find(
    { UserName: UserName, Password: Password },
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "fail", data: error });
      }
      if (data.length > 0) {
        //create auth token mane json web toke create
        const Payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: data[0],
        };
        const token = jwt.sign(Payload, "Secrete123456789");
        res
          .status(200)
          .json({ status: "Success", token: token, data: data[0] });
      } else {
        res.status(401).json({ status: "UnAuthorized" });
      }
    }
  );
};

//select profile
exports.SelectProfile = (req, res) => {
  let UserName = "";
  ProfileModel.find({ UserName: UserName }, (error, data) => {
    if (error) {
      res.status(404).json({ status: "fail", data: error });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};
