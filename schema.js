import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getEmployees: [Employee]
    getEmployeeByID(id: ID!): Employee
    Login(username: String!, password: String!): String
  }

  type Mutation {
    Signup(username: String!, password: String!, email: String!): User
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    updateEmployee(
      id: ID!
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    deleteEmployee(id: ID!): Employee
  }
`;
