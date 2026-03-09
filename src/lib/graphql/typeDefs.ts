const typeDefs = `#graphql
  type Query {
    health: HealthCheck!
    projects(limit: Int, offset: Int): [Project!]!
    project(id: ID!): Project
    dashboardKPIs: DashboardKPIs!
  }

  type HealthCheck {
    status: String!
    timestamp: String!
  }

  type DashboardKPIs {
    realizedMargin: Float!
    targetMargin: Float!
    tokenCompletionRate: Float!
    activeProjects: Int!
    revenueAtRisk: Float!
    totalTokensSold: Int!
    totalTokensUsed: Int!
  }

  type Project {
    id: ID!
    name: String!
    category: String!
    status: ProjectStatus!
    tokensSold: Int!
    tokensUsed: Int!
    tokenPrice: Float!
    expertRate: Float!
    tokenTier: Int!
    margin: Float!
    createdAt: String!
  }

  enum ProjectStatus {
    ACTIVE
    COMPLETED
    AT_RISK
    PAUSED
  }
`;

export default typeDefs;
