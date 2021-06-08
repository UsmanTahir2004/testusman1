// import { seed } from 'faker';
import { errors } from "../constants/errorMessages.js";
import User from "../models/user.js";

export default {
  /*
   * Implement the register functionality along with its route.
   * The function should throw an error `email required` if
   * email is not passed to it. The return value should be the user object
   * that has been registered
   */
  async registerUser(req, res) {
    const result = await User.create(req.body);
    console.log(req.body);
    return result;
  },

  /*
    Implement the login functionality along with its route. It should return a
    jwt token as well as the information of user who logged in.
  */

  async login(req, res) {
    // Write your logic here
    // if (!req.body.email || !req.body.password) {
    //   return res.status(400).send({
    //     success: false,
    //     message:
    //       "You have entered Invalid Input, Email and Password field must required...!!!",
    //   });
    // }
    User.findOne({ email: req.body.email })
      .select("+password") //find query with comparison of name and password from req.body......!!!
      .exec((error, user2) => {
        if (error) {
          res.status(500).send({
            success: false,
            message: "Internal server error...!!!",
            error: error,
          });
        } else if (user2) {
          console.log(user2);
          res.status(200).send({ success: true, user: user2 });
        } else {
          res
            .status(400)
            .send({ success: false, message: "User not found...!!!" });
        }
      });
  },

  /* Return the db of birth of all users
   *  this function should return an array containing
   *  date of birth of the users in db
   * Example: [1234555, 456789,56767890]
   */

  async getAllUsersBirthday(req, res) {
    //your logic here
    const data = await User.find().select(["birthdate"]);
    console.log(data);
    return data;
  },

  /* Complete the function below that soft deletes (mark delete flag as true)
   * all the female users. Note: This function should also return
   *  all the female users that were deleted
   */

  async softDeleteFemaleUsers() {
    // Your logic here
    User.updateMany({ gender: req.body.gender }, { isDeleted: true }, {}).exec(
      (error, user2) => {
        if (error) {
          console.log("Error: You have Entered an Invalid Input...!!!", error);
          res.status(500).send({ error: error });
        } else {
          res.send({ success: true, user2 });
        }
      }
    );
  },

  /* Given a target string, check which two strings 
  in a given array combine to form the target string. 
  Return the index of those two strings with in a sorted array. Return 0 in case of edge cases;
  */
  async matchFinder(target, seedArray) {
    //Your logic here
  },

  /* Given the data in students array, calculate the age of the students in days
   * Your code shoud return an array of objects with name as key and age in days as value
   * Example:
   * [{"fayaz": 12345, "kaleem": 7543}]
   */
  async birthYear() {
    const students = [
      {
        name: "Ali",
        dateOfBirth: "March 6, 1990",
      },
      {
        name: "Usman",
        dateOfBirth: "August 4, 2004",
      },
      {
        name: "Zoya",
        dateOfBirth: "February 1, 1980",
      },
    ];

    // Your logic here
    const nowDate = new Date();
    console.log();
    let days = [];
    const getDate = students.map((user) => {
      const alldates = user.dateOfBirth;
      const nwdate = new Date(alldates);
      const diffInTime = nowDate.getTime() - nwdate.getTime();
      days = diffInTime / (1000 * 3600 * 24);

      console.log(days);
    });
  },
};
