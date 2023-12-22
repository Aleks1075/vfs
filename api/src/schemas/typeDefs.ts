const typeDefs = `#graphql
type Shirts {
    id: ID!
    name: String!
    description: String
    country: String!
    year: Int!
    price: Float!
    size: [String]
    image: String!
    ratingAvg: Float
}

type Token {
    token: String!
}

type ShirtOrderLine {
    id: ID!
    orderLinePrice: Float
    quantity: Int!
    shirts: Shirts!
    size: String!
}

type Order {
    id: ID!
    orderDate: String!
    totalPrice: Float!
    shirtOrderLines: [ShirtOrderLine!]!
    user: User
}

type User {
    id: ID
    username: String!
    password: String!
    role: String
}

type Review {
    id: ID!
    title: String!
    text: String
    rating: Float!
    user: User!
    shirts: Shirts!
}

type LoginOutput {
    token: String!
    user: User!
}

type Query {
    shirts: [Shirts!]!
    shirt(id: ID): Shirts
    login(userInput: UserInput): LoginOutput
    orders: [Order!]!
    reviewsByShirts(id: ID!): [Review!]!
    ordersByUser(id: ID): [Order!]!
    user(id: ID): User
}

type Mutation {
    createShirts(input: ShirtsInput): Shirts
    deleteShirts(id: ID): Shirts
    updateShirts(input: ShirtsInput): Shirts
    login(userInput: UserInput): LoginOutput
    createOrder(orderInput: OrderInput): Order
    createReview(reviewInput: ReviewInput): Review
    addUser(userInput: UserInput): User
}

input ShirtsInput {
    id: ID
    name: String!
    description: String
    country: String!
    year: Int!
    price: Float!
    size: [String]
    image: String!
    ratingAvg: Float
}

input UserInput {
    username: String!
    password: String!
    role: String
}

input OrderInput {
    id: ID
    orderDate: String!
    totalPrice: Float!
    userId: ID
    shirtOrderLines: [ShirtOrderLineInput!]!
}

input ShirtOrderLineInput {
    id: ID
    orderLinePrice: Float
    quantity: Int!
    size: String!
    shirtsId: ID!
}

input ReviewInput {
    id: ID
    title: String!
    text: String
    rating: Float!
    userId: ID!
    shirtsId: ID!
}
`;

export default typeDefs;