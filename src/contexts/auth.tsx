import { ReactNode, createContext, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { UserInfo } from '@firebase/auth-types';
import { UserType } from "../types/user";

type Props = {
  children: ReactNode
}

type ContextType = {
  signed: boolean,
  signUp?: (email: string, password: string, name: string)=>void
}

export const AuthContext = createContext<ContextType>({
  signed: false,

})

export function AuthProvider({ children }: Props){
  const [user, setUser] = useState<UserType | null>(null);

  async function signUp(email: string, password: string, name: string){
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
      })
      .catch((error)=>{
        console.log(error);
      })
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
