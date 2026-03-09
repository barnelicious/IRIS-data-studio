const typeDefs = `#graphql
  type Query {
    health: HealthCheck!
    dashboardKPIs: DashboardKPIs!
    projects(limit: Int, offset: Int, status: ProjectStatus, category: String): [Project!]!
    project(id: ID!): Project
    monthlyTrends: [MonthlyTrend!]!
    marginByCategory: [CategoryMargin!]!
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
    atRiskProjects: Int!
    totalProjects: Int!
    revenueAtRisk: Float!
    totalRevenue: Float!
    totalTokensSold: Int!
    totalTokensUsed: Int!
    avgTokenPrice: Int!
  }

  type Project {
    id: ID!
    name: String!
    client: String!
    category: String!
    status: ProjectStatus!
    tokensSold: Int!
    tokensUsed: Int!
    tokenPrice: Float!
    expertRate: Float!
    tokenTier: Int!
    margin: Float!
    startDate: String!
    endDate: String
  }

  type MonthlyTrend {
    month: String!
    revenue: Float!
    cost: Float!
    margin: Float!
    tokensSold: Int!
    tokensUsed: Int!
    projects: Int!
  }

  type CategoryMargin {
    category: String!
    avgMargin: Float!
    revenue: Float!
    projects: Int!
    tokensSold: Int!
    tokensUsed: Int!
    completionRate: Int!
  }

  enum ProjectStatus {
    ACTIVE
    COMPLETED
    AT_RISK
    PAUSED
  }
`;

export default typeDefs;
