let schema = `

    type Query {
       category: [Category!]!
       categoryById(id: String): Category
    }

    type Mutation {
       createCategory(name: String, description: String): Category!
    }

    type Category {
        id: String!
        name: String!
        description: String
    }
`
export { schema }
