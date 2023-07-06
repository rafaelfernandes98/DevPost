import { useEffect, useState } from 'react';
import { AreaInput, Container, Input, List } from './styles';
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import { UserDocType, UserType } from '../../types/user';
import { SearchList } from '../../components/SearchList';

export function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState<UserDocType[]>([]);

  useEffect(()=>{
    if(typeof input === 'undefined' || input === ''){
      setUsers([])
      return
    }
    // talvez precise disso depois "\uf8ff"
    const subscriber = firestore().collection('users').where('nome', '>=', input).where('nome', '<=', input + "\uf8ff").onSnapshot((snapshot)=>{
      const listUser: UserDocType[] = []

      snapshot.forEach((doc)=>{
        listUser.push({
          nome: doc.data().nome,
          id: doc.id
        })
      })
      setUsers(listUser)
    })

    return ()=> subscriber()
  },[input])

  return (
    <Container>
      <AreaInput>
        <Feather name='search' size={20} color="#e52246" />
        <Input
          placeholder="Procurando alguem?"
          value={input}
          onChangeText={(e)=>setInput(e)}
          placeholderTextColor="#353840"
        />
      </AreaInput>
      <List
        data={users}
        renderItem={({ item }) => <SearchList data={item as UserDocType}/>}
      />
    </Container>
  );
}
