import Employee from "./models/Employee.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    getEmployees: async (parent, args) => {
      return Employee.find({});
    },
    getEmployeeByID: async (parent, args) => {
      return Employee.findById(args.id);
    },
    Login: async (parent, args) => {
      const { username, password } = args;

      if (!username || !password) {
        return JSON.stringify({
          status: false,
          message: "Login cannot be empty",
        });
      }

      const foundUser = await User.findOne({ username: username });

      if (!foundUser) {
        return JSON.stringify({
          status: false,
          message: "Username not found",
        });
      }

      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (!isMatch) {
        return JSON.stringify({
          status: false,
          message: "Password is incorrect",
        });
      }

      return JSON.stringify({
        status: true,
        message: "Login successful",
      });
    },
  },

  Mutation: {
    Signup: async (parent, args) => {
      const { username, password, email } = args;

      if (!username || !password || !email) {
        return JSON.stringify({
          status: false,
          message: "Signup cannot be empty",
        });
      }

      let newUser = new User({
        username: username,
        password: password,
        email: email,
      });

      return newUser.save();
    },

    addEmployee: async (parent, args) => {
      const { first_name, last_name, email, gender, salary } = args;

      let newEmp = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        salary: salary,
      });

      return newEmp.save();
    },

    updateEmployee: async (parent, args) => {
      if (!args.id) {
        return;
      }

      return await Employee.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            gender: args.gender,
            salary: args.salary,
          },
        },
        { new: true },
        (err, employee) => {
          if (err) {
            console.log("Something went wrong when updating the employee");
          } else {
            return employee;
          }
        }
      );
    },
    deleteEmployee: async (parent, args) => {
      if (!args.id) {
        return JSON.stringify({ status: false, message: "No ID found" });
      }
      return await Employee.findByIdAndDelete(args.id);
    },
  },
};
