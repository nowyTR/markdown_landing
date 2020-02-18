import { getItem } from 'simple-dynamodb'

type UserParams = {
  userId: string
}

async function updateUser(parent, args: UserParams): Promise<User> {
  const { userId } = args
  const user = await getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      userId
    }
  })

  return {
    userId,
    createdAt: user.Item ? user.Item.createdAt : null,
    lastSignedInAt: user.Item ? user.Item.lastSignedInAt : null
  }
}

export { updateUser }
