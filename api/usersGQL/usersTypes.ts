const typeDefs = `#graphql

type User {
  password: String
  username: String
}

type LoginResult {
  status: Int
  token: String
}

type RegisterResult {
  status: Int
  message: String
  user: User
}

input InputUser {
  username: String
  password: String
}
`;

const typesQuery = `#graphql

type Query {
  getUser(id: ID!): User
}


type Mutation {
  register(user: InputUser): RegisterResult
  loginUser(user: InputUser): LoginResult
}
`;

const usersTypes = typeDefs + typesQuery;

export default usersTypes;

