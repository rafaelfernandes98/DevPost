
import { Text, View } from 'react-native';
import { Button, ButtonText, Container, Input } from './styles';
import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../contexts/auth';

export function NewPost() {
  const navigation = useNavigation()
  const [post, setPost] = useState('');
  const {user} = useContext(AuthContext)

  async function handlePost(){
    if (post === ''){
      return
    }

    let avatarUrl = null

    try {
      if (user){
        let response = await storage().ref('users').child(user.uid).getDownloadURL()
        avatarUrl = response
      }
    } catch (error) {
      avatarUrl = null
    }

    await firestore().collection('posts').add({
      created: new Date(),
      content: post,
      autor: user?.nome,
      userId: user?.uid,
      likes: 0,
      avatarUrl
    })
    .then(()=>{
      setPost('')
      navigation.goBack()
    })
    .catch((e)=>{
      console.log('error:', e)
    })
  }

  useLayoutEffect(()=>{

    const options = navigation.setOptions({
      headerRight: ()=> (
        <Button onPress={()=> handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

  return (
    <Container>
      <Input
        placeholder='O que está acontecendo?'
        value={post}
        onChangeText={(t)=> setPost(t)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor='#ddd'
        maxLength={300}
      />

    </Container>
  );
}
