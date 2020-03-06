type User = {
  userId: string
  createdAt: Date | string
  lastSignedInAt: Date | string
}

type LandingPage = {
  userId: string
  pageId: string
  createdAt: Date | string
  lastUpdatedAt: Date | string
  pageName: string
  content: string
}
