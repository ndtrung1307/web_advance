var mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://trungnguyen:trung123@cluster0.hanfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  function () {
    console.log("mongodb connected");
  }
);
module.exports = mongoose;
