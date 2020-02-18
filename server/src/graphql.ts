import { ApolloServer, gql } from 'apollo-server-lambda'
import { updateUser } from './mutations'

// The shape of API
const schema = gql`
  type Query {
    hello: Hello
  }

  type Hello {
    world: String
  }

  type User {
    userId: String!
    createdAt: String
    lastSignedInAt: String
  }

  type Mutation {
    updateUser(userId: String): User
  }
`

// map shape to functions
const resolvers = {
  Query: {
    hello: () => ({
      world: 'Hello Dank memers 123'
    })
  },
  Mutation: {
    updateUser
  }
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
