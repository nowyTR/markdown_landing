import { ApolloServer, gql } from 'apollo-server-lambda'

// The shape of API
const schema = gql`
  type Query {
    hello: Hello
  }

  type Hello {
    world: String
  }
`

// map shape to functions
const resolvers = {
  Query: {
    hello: () => ({
      world: 'Hello World'
    })
  }
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
