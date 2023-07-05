import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"

export type PostsUserParams = {
  params: {
    title?: string;
    userId: string
  }
}

export type RouteParams = {
  Home: undefined
  NewPost: undefined
  PostsUser :{
    title : string
    userId: string
  }
}

export type RouteProps = NativeStackNavigationProp<RouteParams>
