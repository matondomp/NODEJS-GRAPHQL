import { createServer } from 'http'
import { createSchema, createYoga } from 'graphql-yoga'
import { schema } from '../schema/schema.mjs'
import { uuid } from 'uuidv4';

let categories = []

function createCategory({ name, description }) {
  let id = uuid()
  let category = { id, name, description }
  categories.push(category)
  return category
}

function categoryById(args) {
  let category = categories.filter(item => item.id == args.id)
  return category[0]
}

const yogaServer = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: {
      Query: {
        category: () => { return categories },
        categoryById: (parent, args) => categoryById(args)
      },
      Mutation: {
        createCategory: (parent, args) => createCategory(args)
      },
    }
  })
})

createServer(yogaServer).listen(4000, () => {
  console.info('GraphQL is running on http://localhost:4000/graphql')
})