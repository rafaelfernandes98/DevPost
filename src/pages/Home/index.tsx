import * as React from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Container, ButtonPost } from './styles';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';


export function Home() {
  const navigation = useNavigation()
  return (
    <Container>
      <Text>Home</Text>
      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost' as never)}
      >
        <Feather
          name='edit-2'
          color='#fff'
          size={25}
        />
      </ButtonPost>
    </Container>
  );
}
