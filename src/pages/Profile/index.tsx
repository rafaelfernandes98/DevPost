
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import {
  Avatar,
  Button,
  ButtonBack,
  ButtonText,
  Container,
  Email,
  Input,
  ModalContainer,
  Name,
  UploadButton,
  UploadText
} from './styles';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { Header } from '../../components/Header';
import { Modal, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import { UserType } from '../../types/user';
import storage from '@react-native-firebase/storage'


export function Profile() {
  const { signOut, user, setUser, storageUser } = useContext(AuthContext)

  const [name, setName] = useState<string>(user?.nome ? user?.nome : '');
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    async function loadAvatar(){
      if (!user?.uid) return
      try {
        let response = await storage().ref('users').child(user?.uid).getDownloadURL()

        setUrl(response)
      } catch (error) {
        console.log('error: ', error);
      }
    }

    loadAvatar()

    // return () => loadAvatar()

  },[])


  function handleSignOut(){
    if (signOut){
      signOut()
    }
  }

  async function updateProfile(){
    if (name === '' || !user?.uid || !user?.email) return

    await firestore().collection('users').doc(user?.uid).update({
      nome: name
    })

    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get()

    postDocs.forEach( async doc =>{
      await firestore().collection('posts').doc(doc.id)
      .update({
        autor: name
      })
    })

    let data: UserType = {
      uid: user?.uid,
      nome: name,
      email: user?.email
    }

    if (setUser && storageUser) {
      setUser(data)
      storageUser(data)
      setOpen(false)
    }
  }

  function uploadFile(){
    launchImageLibrary({
        // noData: true,
        mediaType: 'photo',
      }, response =>{
      if(response.didCancel){
        console.log('Cancelou');
      }else if(response.errorCode){
        console.log('Erro');
      }else {
        uploadFileFirebase(response)
        .then(()=>{
          uploadAvatarPosts()
        })

        if (response.assets){
          setUrl(response.assets[0].uri ? response.assets[0].uri : '')
        }

      }
    })
  }

  async function uploadAvatarPosts(){
    if (!user?.uid) return

    const storageRef = storage().ref('users').child(user?.uid)
    await storageRef.getDownloadURL()
    .then(async(image)=>{
      const postDocs = await firestore().collection('posts').where('userId', '==', user.uid).get()

      postDocs.forEach(async doc =>{
        await firestore().collection('posts').doc(doc.id).update({
          avatarUrl: image
        })
      })
    })
    .catch((error)=>{
      console.log('error: ', error);
    })

  }

  function getFileLocalPath(response: any){
    return response.assets[0].uri
  }

  async function uploadFileFirebase(response: any){
    if (!user?.uid) return
    const fileSource = getFileLocalPath(response)

    const storageRef = storage().ref('users').child(user?.uid)

    return await storageRef.putFile(fileSource)
  }

  return (
    <Container>
      <Header/>

      {url ? (
        <UploadButton onPress={uploadFile}>
          <UploadText>+</UploadText>
          <Avatar
            source={{uri: url}}
          />
        </UploadButton>
      ): (
          <UploadButton onPress={uploadFile}>
            <UploadText>+</UploadText>
          </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428cfd" onPress={()=> setOpen(true)}>
        <ButtonText color="#fff">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#ddd" onPress={handleSignOut}>
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android'? undefined: 'padding'}>
          <ButtonBack onPress={()=> setOpen(false)}>
            <Feather name='arrow-left' size={22} color='#121212' />
             <ButtonText color='#121212'>Voltar</ButtonText>
          </ButtonBack>

          <Input  placeholder={user?.nome} value={name} onChangeText={(e)=> setName(e)}/>

          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#fff">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>

    </Container>
  );
}
