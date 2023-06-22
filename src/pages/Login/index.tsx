
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { Button, ButtonText, Container, Input, SignUpButton, SignUpText, Title } from './styles'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

export function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, signIn, loadingAuth } = useContext(AuthContext)

  function toggleLogin(){
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }

  function handleSignIn(){
    if( email === '' || password === ''){
      Alert.alert('Preencha todos os campos!')
      return
    }

    if (signIn){
      signIn(email, password)
    }
  }

  function handleSignUp(){
    if (name === '' || email === '' || password === '') {
      Alert.alert('Preencha todos os campos!')
      return
    }

    if (signUp){
      signUp(email, password, name)
    }

  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{ color: '#e52246' }}>Post</Text>
        </Title>

        <Input
          placeholder='seuemail@email.com'
          value={email}
          onChangeText={(t)=> setEmail(t)}
        />
        <Input
          placeholder='**********'
          value={password}
          onChangeText={(t) => setPassword(t)}
        />

        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color='#fff' />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Dev<Text style={{ color: '#e52246' }}>Post</Text>
      </Title>

      <Input
        placeholder='Seu nome'
        value={name}
        onChangeText={(t)=> setName(t)}
      />

      <Input
        placeholder='seuemail@email.com'
        value={email}
        onChangeText={(t) => setEmail(t)}
      />
      <Input
        placeholder='**********'
        value={password}
        onChangeText={(t) => setPassword(t)}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20}color='#fff'/>
        ): (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já possuo uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
