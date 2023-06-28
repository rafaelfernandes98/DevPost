
import { Text, View } from 'react-native';
import { Button, ButtonText, Container, Input } from './styles';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export function NewPost() {
  const navigation = useNavigation()
  const [post, setPost] = useState('');

  useLayoutEffect(()=>{

    const options = navigation.setOptions({
      headerRight: ()=> (
        <Button>
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
