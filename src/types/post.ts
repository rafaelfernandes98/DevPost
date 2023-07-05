export type PostType = {
  id: string
  autor: string
  avatarUrl: any
  content: string
  created: CreatedType
  likes: number
  userId: string
}


type CreatedType = {
  seconds: number,
  nanoseconds: number
}
