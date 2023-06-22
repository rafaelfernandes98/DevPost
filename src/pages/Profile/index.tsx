
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';


export function Profile() {
  const {signOut} = useContext(AuthContext)

  function handleSignOut(){
    if (signOut){
      signOut()
    }
  }
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sair" onPress={handleSignOut}/>
    </View>
  );
}
