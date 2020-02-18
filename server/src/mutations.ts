import { getItem, updateItem } from 'simple-dynamodb'

type UserParams = {
  userId: string
}

async function updateUser(parent, args: UserParams): Promise<User> {
  const { userId } = args
  const result = await getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      userId
    }
  })

  let user = result.Item

  if (user != null) {
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId
      },
      UpdateExpression: 'SET lastSignedInAt = :lastSignedInAt',
      ExpressionAttributeValues: {
        ':lastSignedInAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    })

    user = result.Attributes
  } else {
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId
      },
      UpdateExpression: 'SET createdAt = :createdAt, lastSignedInAt = :lastSignedInAt',
      ExpressionAttributeValues: {
        ':createdAt': new Date().toISOString(),
        ':lastSignedInAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    })

    user = result.Attributes
  }

  return {
    userId,
    createdAt: user ? user.createdAt : null,
    lastSignedInAt: user ? user.lastSignedInAt : null
  }
}

export { updateUser }
