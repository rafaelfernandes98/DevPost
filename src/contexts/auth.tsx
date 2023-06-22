import { ReactNode, createContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { UserInfo } from '@firebase/auth-types';
import { UserType } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  children: ReactNode
}

type ContextType = {
  signed: boolean,
  signUp?: (email: string, password: string, name: string)=>void
  signIn?: (email: string, password: string)=>void
  signOut?: ()=>void
  loadingAuth: boolean
  loading: boolean
}

export const AuthContext = createContext<ContextType>({
  signed: false,
  loadingAuth: false,
  loading: true
})

export function AuthProvider({ children }: Props){
  const [user, setUser] = useState<UserType | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@devapp')

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
      setLoading(false)
    }

    loadStorage()
  },[])

  async function signUp(email: string, password: string, name: string){
    setLoadingAuth(true)
    await auth().createUserWithEmailAndPassword(email, password)
    .then(async (value)=>{
      let uid = value.user.uid

      await firestore().collection('users')
      .doc(uid).set({
        nome: name,
        createdAt: new Date()
      })
      .then(()=>{
        let data = {
          uid,
          nome: name,
          email: value?.user?.email,
        }
        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
      })
      .catch((error)=>{
        console.log(error);
        setLoadingAuth(false)
      })
    })
  }

  function signIn(email: string, password: string) {
    setLoadingAuth(true)
    auth().signInWithEmailAndPassword(email, password)
    .then(async(value)=>{
      let uid = value.user.uid

      const userProfile = await firestore().collection('users').doc(uid).get()

      let data = {
        uid,
        nome: userProfile.data()?.nome,
        email: value.user.email
      }

      setUser(data)
      storageUser(data)
      setLoadingAuth(false)
    })
    .catch((error)=>{
      console.log('error: ', error)
      setLoadingAuth(false)
    })
  }

  async function signOut(){
    await auth().signOut()
    await AsyncStorage.clear()
    .then(()=>{
      setUser(null)
    })
  }

  async function storageUser(data: object){
    await AsyncStorage.setItem('@devapp', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signUp, signIn, signOut, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
