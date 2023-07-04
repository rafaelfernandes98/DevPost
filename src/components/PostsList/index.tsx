import { useState } from "react";
import { Actions, Avatar, Container, Content, ContentView, Header, Like, LikeButton, Name, TimePost } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import firestore from '@react-native-firebase/firestore'

type Props ={
  userId?: string,
  data: any
}

export function PostsList({ data, userId } : Props): JSX.Element{

  const { likes, avatarUrl, autor, content, created } = data

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
      <Header>
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
