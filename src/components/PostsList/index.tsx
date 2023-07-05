import { useState } from "react";
import { Actions, Avatar, Container, Content, ContentView, Header, Like, LikeButton, Name, TimePost } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import firestore from '@react-native-firebase/firestore'
import { PostType } from "../../types/post";
import { useNavigation } from "@react-navigation/native";
import { RouteParams, RouteProps } from "../../types/route";

type Props ={
  userId?: string,
  data: PostType
}

export function PostsList({ data, userId } : Props): JSX.Element{
  const navigation = useNavigation<RouteProps>()

  const { likes, avatarUrl, autor, content, userId: id } = data

  const [likePost, setLikePost] = useState(likes);

  async function handleLikePost(id: any, likes: any){
    const docId = `${userId}_${id}`

    const doc = await firestore().collection('likes').doc(docId).get()

    if(doc.exists){
      await firestore().collection('posts').doc(id).update({
        likes: likes - 1
      })
      await firestore().collection('likes').doc(docId).delete()
      .then(()=>{
        setLikePost(likes -1)
      })
      return
    }

    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId
    })

    await firestore().collection('posts').doc(id).update({
      likes: likes + 1
    })
    .then(()=>{
      setLikePost(likes + 1)
    })
  }

  function formatTimePost(){
    const datePost = new Date(data.created.seconds * 1000)

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  return (
    <Container>
      <Header onPress={() => navigation.navigate("PostsUser", { title: autor, userId: id })}>
        {avatarUrl ? (
          <Avatar
            source={{uri: avatarUrl}}
          />
        ) : (

          <Avatar
            source={require('../../assets/avatar.png')}
          />
        )}
        <Name numberOfLines={1}>{autor}</Name>
      </Header>

      <ContentView>
        <Content>{content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>
            {likePost === 0 ? '': likePost}
          </Like>
          <MaterialCommunityIcons name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'} size={20} color='#e52246'/>
        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>
    </Container>

  )
}
