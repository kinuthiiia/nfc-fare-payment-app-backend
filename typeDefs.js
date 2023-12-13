const typeDefs = `

type Collector {
    id: ID!
    name: String
    email: String    
    phoneNumber: String
    accountBalance: Int
}

type Deposit {
    id: ID!
    code: String
    amount: Int
    timestamp: String
    phoneNumber: String
    account: User  
}

type Tag {
    id: ID!
    serial: String
    cancelledAt: String
    createdAt: String  
    account: User
}

type Transaction {
    id: ID!
    amount: Int
    tag: Tag
    collector: Collector
    createdAt: String
}

type User {
    id: ID!
    name: String
    email: String    
    image: String
    phoneNumber: String  
    tags: [Tag]
    transactions: [Transaction]
    accountBalance: Int
    smsNotification: Boolean
    emailNotification: Boolean
}

type Payload {
    type: String
    message: String
    data: Transaction
}


type Query { 
   getAccount(email: String): User 
}

type Mutation {
    editProfile(
        email: String
        name: String
        phoneNumber: String
        image: String
        smsNotification: Boolean
        emailNotification: Boolean
    ) : User

    cancelTag(
        id: ID!        
    ) : User

    writeTag(
        serial: String
        account: ID
    ) : User

    createUser(
        name: String
        email: String
        phoneNumber: String
    ): User

    createCollector(
        name: String
        email: String
        phoneNumber: String
    ): User

    topUpAccount(
        code: String
        amount:Int
        timestamp: String
        phoneNumber: String
        account: ID
    ) : Deposit

    transact(
        tag: ID
        amount: Int
        collector: ID
    ) : Payload
}

`;

export default typeDefs;
